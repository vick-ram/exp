import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import { matchedData, validationResult } from "express-validator";
import user from "../models/user";
import { createToken } from "../utils/jwt";
import { successResponse, errorResponse, ApiResponse } from "../utils/response";

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = matchedData(req);

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser)
    res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ name, email, password: hashedPassword });

    await newUser.save();
    const response: ApiResponse<{ name: string; email: string }> =
      successResponse(
        {
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

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     res.status(400).json({ errors: errors.array() });
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

// get user profile
export const profile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.user;
   res.status(200).json({ user });
};

// get all users
export const getUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await user.find();
     res.status(200).json({ users });
  } catch (error) {
    const response: ApiResponse<null> = errorResponse(
      "Internal server error",
      500
    );
     res.status(500).json(response);
  }
};
