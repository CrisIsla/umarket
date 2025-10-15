import cookieParser from "cookie-parser";
import express from "express";
import { authErrorHandler } from "./utils/authMiddleware";
import errorHandler from "./utils/errorMiddleware";
import productRouter from "./controllers/product";
import cors from "cors";
const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/products", productRouter);

app.use(authErrorHandler);
app.use(errorHandler);
export default app;
