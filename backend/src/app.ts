import cookieParser from "cookie-parser";
import express from "express";
import { authErrorHandler } from "./utils/authMiddleware";
import authController from "./controllers/authController";
const app = express();

app.use(express.static("dist"));
app.use(express.json());

app.use(cookieParser());
app.use("/auth", authController);
app.use(authErrorHandler);
export default app;