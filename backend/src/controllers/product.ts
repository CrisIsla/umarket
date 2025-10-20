import express from "express";
import Product from "../models/products";
import User from "../models/user";
import { withUser } from "../utils/authMiddleware";
import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get("/", async (request, response) => {
  const products = await Product.find({}).populate("seller", {
    name: 1,
    contact: 1,
  });
  response.json(products);
});

router.get("/:id", async (request, response, next) => {
  const id = request.params.id;
  const product = await Product.findById(id).populate("seller", {
    name: 1,
    contact: 1,
  });
  if (product) {
    response.json(product);
  } else {
    response.status(404).end();
  }
});

router.post(
  "/",
  withUser,
  upload.array("photos", 5),
  async (request, response, next) => {
    const body = request.body;
    const user = await User.findById(request.userId);

    const files = (request.files as Express.Multer.File[]) || [];
    const requiredFields = [
      "title",
      "description",
      "price",
      "condition",
      "category",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return response.status(400).json({ error: `${field} missing` });
      }
    }
    if (!user) {
      response.status(400).json({
        error: "user not found",
      });
    } else {
      const product = {
        title: body.title,
        description: body.description,
        date: new Date(),
        condition: body.condition,
        price: body.price,
        category: body.category,
        tags: body.tags,
        photos: files.map((file) => {
          const buffer = file.buffer;
          const base64String = 'data:img/png;base64,' + Buffer.from(buffer).toString('base64');
          return base64String;
        }),
        seller: user.id,
      };

      const savedProduct = await new Product(product).save();

      response.status(201).json(savedProduct);
    }
  },
);

export default router;
