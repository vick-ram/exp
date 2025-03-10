import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/response";

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
    const response: ApiResponse<null> = {
      message: "Unauthorized, token missing",
      status: 401,
    }

    res.status(401).json(response);
    return;
  }

  try {
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, String(secret));

    if (typeof decoded === "object") {
      req.user = decoded;
      next();
    } else {
      const response: ApiResponse<null> = {
        message: "Unauthorized, invalid token",
        status: 401,
      }

      res.status(401).json(response);
      return;
    }
  } catch (error: any) {
    const response: ApiResponse<null> = {
      message: `Unauthorized, invalid token: ${error.message}`,
      status: 401,
    }

    res.status(401).json(response);
    return;
  }
};


