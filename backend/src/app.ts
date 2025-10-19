import cookieParser from "cookie-parser";
import express from "express";
import { authErrorHandler } from "./utils/authMiddleware";
import errorHandler from "./utils/errorMiddleware";
import authController from "./controllers/authController";
import productRouter from "./controllers/product";
import mongoose from "mongoose";
import config from "./utils/config";
import logger from "./utils/logger";

const { MONGODB_DBNAME, MONGODB_URI } = config;
const app = express();

mongoose.set("strictQuery", false);

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, { dbName: MONGODB_DBNAME }).catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });
}

app.use(express.static("dist"));
app.use(express.json());

app.use(cookieParser());

app.use("/products", productRouter);
app.use("/auth", authController);

app.use(authErrorHandler);
app.use(errorHandler);
export default app;