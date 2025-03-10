import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import user from "../models/user";
import { createToken } from "../utils/jwt";
import { successResponse, errorResponse, ApiResponse } from "../utils/response";
import { AuthRequest } from "../middlewares/authMiddleWare";
const { matchedData, validationResult } = require("express-validator");

export const register = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { name, email, password } = matchedData(req);

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ name, email, password: hashedPassword });

    await newUser.save();
    const response: ApiResponse<{ id: string; name: string; email: string }> =
      successResponse(
        {
          id: newUser._id as string,
          name: newUser.name,
          email: newUser.email,
        },
        "User created successfully",
        201
      );
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse<null> = errorResponse(
      "Internal server error",
      500
    );
    res.status(500).json(response);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = matchedData(req);

  try {
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      const response: ApiResponse<null> = errorResponse(
        "Invalid password",
        400
      );
      res.status(400).json(response);
    }

    const token = createToken(existingUser._id as string);
    const response: ApiResponse<{ token: string }> = successResponse(
      { token },
      "Login successful",
      200
    );
    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse<null> = errorResponse(
      "Internal server error",
      500
    );
    res.status(500).json(response);
  }
};

export const profile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user || typeof req.user !== "object") {
      const response: ApiResponse<null> = errorResponse(
        "Unauthorized, user not found",
        401
      );
      res.status(401).json(response);
    }

    const { userId } = req.user as { userId: string };

    const u = await user.findById(userId).select("-password");

    if (!u) {
      const response: ApiResponse<null> = errorResponse(
        "Unauthorized, user not found",
        401
      );
      res.status(401).json(response);
    }

    if (!u) {
      const response: ApiResponse<null> = errorResponse(
        "Unauthorized, user not found",
        401
      );
      res.status(401).json(response);
      return;
    }

    const response: ApiResponse<typeof u> = successResponse(
      u,
      "User profile retrieved successfully",
      200
    );
    res.status(200).json(response);
  } catch (error: any) {
    const response: ApiResponse<null> = errorResponse(
      `Internal server error: ${error.message}`,
      500
    );
    res.status(500).json(response);
  }
};

// get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await user.find().select("-password");
    const response: ApiResponse<typeof users> = successResponse(
      users,
      "Users retrieved successfully",
      200
    );
    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse<null> = errorResponse(
      "Internal server error",
      500
    );
    res.status(500).json(response);
  }
};

// Update profile
export const updateProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user || typeof req.user !== "object") {
      const response: ApiResponse<null> = errorResponse("user not found", 401);
      res.status(401).json(response);
    }

    const { userId } = req.user as { userId: string };

    const u = await user.findById(userId).select("-password");

    if (!u) {
      const response: ApiResponse<null> = errorResponse("user not found", 401);
      res.status(401).json(response);
      return;
    }

    const { name, email, phone } = matchedData(req);

    u.updateOne({ name, email, phone });

    await u.save();

    const response: ApiResponse<typeof u> = successResponse(
      u,
      "User profile updated successfully",
      200
    );

    res.status(200).json(response);
  } catch (error: any) {
    const response: ApiResponse<null> = errorResponse(
      `Internal server error: ${error.message}`,
      500
    );
    res.status(500).json(response);
  }
};

// Delete user
export const deleteUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    user.findByIdAndDelete(req.params.id);
    const response: ApiResponse<null> = successResponse(
      null,
      "User deleted successfully",
      200
    );
    res.status(200).json(response);
  } catch (error: unknown) {
    const response: ApiResponse<null> = errorResponse(
      `Internal server error: ${error}`,
      500
    );
    res.status(500).json(response);
  }
};
