import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

export interface AuthRequest extends Request {
  user?: object;
}

export const authMiddleWare = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return next(new Error("Unauthorized, token missing"));
  }

  try {
    token = token.split(" ")[1];
    console.log(`Token: ${token}`);
    console.log(`Secret: ${secret}`);
    const decoded = jwt.verify(token, String(secret));
    console.log(`Decoded: ${JSON.stringify(decoded)}`);
    if (typeof decoded === "object") {
      req.user = decoded;
      return next();
    } else {
      return next(new Error("Unauthorized, invalid token"));
    }
  } catch (error: any) {
    return next(new Error(`Unauthorized, invalid token: ${error.message}`));
  }
};


