import express from "express";
import Product from "../models/products";
import User from "../models/user";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import { withUser } from "../utils/authMiddleware";

const router = express.Router();

router.get("/", async (request, response) => {
  const notes = await Product.find({}).populate("seller", {
    username: 1,
    email: 1,
  });
  response.json(notes);
});

router.get("/:id", async (request, response, next) => {
  const id = request.params.id;
  const product = await Product.findById(id).populate("seller", {
    username: 1,
    email: 1,
  });
  if (product) {
    response.json(product);
  } else {
    response.status(404).end();
  }
});

router.post("/", withUser, async (request, response, next) => {
  const body = request.body;
  const user = await User.findById(request.userId);

  if (!user) {
    response.status(400).json({
      error: "user not found",
    });
  } else if (!body.title) {
    response.status(400).json({
      error: "title missing",
    });
  } else if (!body.description) {
    response.status(400).json({
      error: "description missing",
    });
  } else if (!body.price) {
    response.status(400).json({
      error: "price missing",
    });
  } else if (!body.condition) {
    response.status(400).json({
      error: "condition missing",
    });
  } else if (!body.category) {
    response.status(400).json({
      error: "category missing",
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
      photos: [],
      seller: user.id,
    };

    const savedProduct = await new Product(product).save();

    response.status(201).json(savedProduct);
  }
});

export default router;
