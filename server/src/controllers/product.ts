import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { Product } from "../models/product.js";
import { rm } from "fs";

export const newProduct = TryCatch(
  async (
    req: Request<{}, {}, NewProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    if (!photo)
      return next(
        new ErrorHandler("Please provide a photo for this product", 400)
      );

    if (!name || !price || !stock || !category) {
      rm(photo.path, () => [console.log("Photo deleted")]);
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

export const getLatestProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({})
    .sort({ createAt: -1 })
    .limit(10)
    .lean()
    .exec();

  if (!products) return next(new ErrorHandler("No products found", 400));

  return res.status(200).json({
    success: true,
    message: "Latest products",
    products,
  });
});

export const getAllCategories = TryCatch(async (req, res, next) => {
  const categories = await Product.find({}).distinct("category").exec();

  if (!categories) return next(new ErrorHandler("No categories found", 400));

  return res.status(200).json({
    success: true,
    message: "All categories",
    categories,
  });
});

export const getAllProducts = TryCatch(async (req, res, next) => {
  const allProducts = await Product.find({}).lean().exec();

  if (!allProducts) return next(new ErrorHandler("No Products found", 400));

  return res.status(200).json({
    success: true,
    message: "All categories",
    allProducts,
  });
});


export const getSingleProduct = TryCatch(async(req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if(!product){
    return next(new ErrorHandler(`No product exists with id ${id}`, 400));
  }

  return res.status(200).json({
     success: true,
     message: `${product.name} is fetched`,
     product
  });
});

export const updateProduct = TryCatch(async(req, res, next) => {

});
