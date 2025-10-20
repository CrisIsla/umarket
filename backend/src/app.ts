import cookieParser from "cookie-parser";
import express from "express";
import { authErrorHandler } from "./utils/authMiddleware";
import authController from "./controllers/authController";
import productRouter from "./controllers/product";
import mongoose from "mongoose";
import config from "./utils/config";
import logger from "./utils/logger";

import middleware from "./utils/middleware";

const { MONGODB_DBNAME, MONGODB_URI } = config;
const { requestLogger, errorHandler, unknownEndpoint } = middleware
const app = express();

mongoose.set("strictQuery", false);

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, { dbName: MONGODB_DBNAME }).catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });
}
app.use(express.static("dist"));
app.use(express.json());
app.use(requestLogger)
app.use(cookieParser());

app.use("/api/products", productRouter);
app.use("/api/auth", authController);

app.use(authErrorHandler);
app.use(unknownEndpoint);
app.use(errorHandler);
export default app;