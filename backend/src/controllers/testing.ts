import express from "express";
import Product from "../models/products";
import User from "../models/user";

const router = express.Router();

router.post("/reset", async (request, response) => {
  await Product.deleteMany({});
  await User.deleteMany({});
  response.status(204).end();
});

export default router;
