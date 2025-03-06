import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET || "default";

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
    return res.status(401).json({ message: "Unauthorized, token missing" });
  }

  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === "object") {
      req.user = decoded;
    } else {
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

