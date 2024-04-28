import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import { Product } from "../models/product.js";
import { rm } from "fs";
export const newProduct = TryCatch(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo)
        return next(new ErrorHandler("Please provide a photo for this product", 400));
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
});
export const getLatestProducts = TryCatch(async (req, res, next) => {
    const products = await Product.find({}).sort({ createAt: -1 }).limit(10);
    if (!products)
        return next(new ErrorHandler("No products found", 400));
    return res.status(200).json({
        success: true,
        message: "Latest products",
        products
    });
});
