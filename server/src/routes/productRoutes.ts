const { body } = require("express-validator");
import { Router } from "express";


const router = Router();

router.post([
  body("name").notEmpty().withMessage('Name is required').trim(),
  body("description")
    .notEmpty()
    .withMessage('Name is required')
    .trim(),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value: number) => value > 0)
    .withMessage("Price must be greater than 0"),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be non-nrgative integer"),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
body('category')
    .notEmpty().withMessage('Category is required')
]);
