import { Request, Response } from "express";
import Product from "../models/Product";
import { ApiResponse, errorResponse, successResponse } from "../utils/response";
import Category from "../models/Category";
const { matchedData, validationResult } = require("express-validator");

// Create category
export const createCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({errors: errors.array()});
      return;
    }
    // Sanitize request data
    const categoryData = matchedData(req);
    // Create schema from sanitized data
    const newCategory = new Category(categoryData);
    // save it to database
    await newCategory.save();

    // send a response
    const response: ApiResponse<typeof newCategory> = successResponse(
      newCategory,
      "Category created successfully",
      201
    );
    res.status(201).json(response);
  } catch (error) {
    
  }
}


// Create new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const productData = matchedData(req);

    const newProduct = new Product(productData);

    // Save product
    await newProduct.save();

    // Respond when a product is already created
    const response: ApiResponse<typeof newProduct> = successResponse(
      newProduct,
      "Product created successfully",
      201
    );
    res.status(201).json(response);
  } catch (error: any) {
    const response: ApiResponse<null> = errorResponse(
      `Server error: ${error}`,
      500
    );
    res.status(500).json(response);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const productData = matchedData(req);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true }
    );

    if (!updatedProduct) {
      const response: ApiResponse<null> = errorResponse(
        "Product not found",
        404
      );
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<typeof updatedProduct> = successResponse(
      updatedProduct,
      "Product updated successfully",
      204
    );
    res.status(204).json(response);
  } catch (error: any) {
    const response: ApiResponse<null> = errorResponse(
      `Server error: ${error}`,
      500
    );
    res.status(500).json(response);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const response: ApiResponse<null> = errorResponse(
        "Product not found",
        404
      );
      res.status(404).json(response);
      return;
    }
    const response: ApiResponse<typeof product> = successResponse(
      product,
      "Successfully retrieved",
      200
    );
    res.status(200).json(response);
  } catch (error: any) {
    const response: ApiResponse<null> = errorResponse(
      `Server Error: ${error}`,
      500
    );
    res.status(500).json(response);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      const response: ApiResponse<null> = errorResponse(
        "Product not found",
        404
      );
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<typeof deletedProduct> = successResponse(
      deletedProduct,
      "Product deleted successfully",
      204
    );

    res.status(204).json(response);
  } catch (error) {
    const response: ApiResponse<null> = errorResponse(
      `Server error: ${error}`,
      500
    );
    res.status(500).json(response);
  }
};
