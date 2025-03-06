import express, { Request, Response } from "express";
import { body } from "express-validator";
import { authMiddleWare } from "../middlewares/authMiddleWare";
import { register, login } from "../controllers/authController";

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

router.get("/profile", authMiddleWare, async (req: Request, res: Response) => {
  const user = req.user;
  return res.status(200).json({ user });
});

export default router;
