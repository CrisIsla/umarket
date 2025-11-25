import express from "express";
import Product from "../models/products";
import User from "../models/user";

const router = express.Router();

router.post("/reset", async (request, response) => {
  await Product.deleteMany({});
  await User.deleteMany({});
  response.status(204).end();
});

router.post("/new/product", async (request, response) => {
  let user = await User.findOne({ name: "test admin" });
  if (!user) {
    user = await new User({
      contact: { email: "admin@admin.com" },
      name: "test admin",
      password: "admin",
    }).save();
  }
  const body = request.body;
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
      const base64String =
        "data:img/png;base64," + Buffer.from(buffer).toString("base64");
      return base64String;
    }),
    seller: user.id,
  };

  const savedProduct = await new Product(product).save();

  response.status(201).json(savedProduct);
});

export default router;
