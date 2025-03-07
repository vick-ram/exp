import express from "express";
// import { body } from "express-validator";
import { authMiddleWare } from "../middlewares/authMiddleWare";
import {
  register,
  login,
  profile,
  getUsers,
} from "../controllers/authController";
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  login
);

router.get("/profile", authMiddleWare, profile);

router.get("/users", authMiddleWare, getUsers);

export default router;
