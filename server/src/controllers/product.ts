import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { Product } from "../models/product.js";

export const newProduct = TryCatch(
  async (
    req: Request<{}, {}, NewProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, price, stock, category } = req.body;

    const photo = req.file;

    if (!name || !price || !photo || !stock || !category) {
      return next(new ErrorHandler("Please provide all fields", 400));
    }

    const product = await Product.create({
      name,
      photo: photo?.path,
      price,
      stock,
      category: category.toLowerCase(),
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  }
);
