import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/response";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  const response: ApiResponse<null> = {
    message: err.message || "Internal server error",
    status: 500,
  };

  res.status(500).json(response);
};
