import type { Response } from "express";
import { User } from "../interfaces/User";
import config from "./config";
import jwt from "jsonwebtoken";

function addTokenToResponse( response: Response, user: User){
    const userForToken = {
        email: user.contact.email,
        csrf: crypto.randomUUID(),
        id: user.id
    };

    const token = jwt.sign(userForToken, config.JWT_SECRET, { expiresIn: 24 * 60 * 60 });
    response.setHeader("X-CSRF-Token", userForToken.csrf);
    response.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    
    response.cookie("csrf", userForToken.csrf, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax',
        path: '/',
    });

    return response;
};

export {
    addTokenToResponse
}