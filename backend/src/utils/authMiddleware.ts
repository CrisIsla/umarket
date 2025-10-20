import { NextFunction, Request, Response } from "express";
import config from "./config";
import jwt from "jsonwebtoken";
import logger from "./logger";

const withUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<void> => {
    const authReq = req;
    const token = req.cookies?.token;
    if (!token){
        res.status(401).json({error: "missing token"});
    } else {
        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        const csrfToken = req.headers["x-csrf-token"];
        if (typeof decodedToken === "object" && decodedToken.id && decodedToken.csrf === csrfToken){
            authReq.userId = decodedToken.id;
            next();
        } else {
            res.status(401).json({ error: "invalid token" });
        }
    }
};

const authErrorHandler = (
  error: { name: string; message: string },
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.message);

  logger.error(error.name);

  if (error.name === "JsonWebTokenError") {
    response.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    response.status(401).json({ error: "invalid token" });
  }

  next(error);
};

export {
    withUser,
    authErrorHandler
}