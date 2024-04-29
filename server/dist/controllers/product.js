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
        rm(photo.path, () => console.log("Photo deleted"));
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
    const products = await Product.find({})
        .sort({ createAt: -1 })
        .limit(10)
        .lean()
        .exec();
    if (!products)
        return next(new ErrorHandler("No products found", 400));
    return res.status(200).json({
        success: true,
        message: "Latest products",
        products,
    });
});
export const getAllCategories = TryCatch(async (req, res, next) => {
    const categories = await Product.find({}).distinct("category").exec();
    if (!categories)
        return next(new ErrorHandler("No categories found", 400));
    return res.status(200).json({
        success: true,
        message: "All categories",
        categories,
    });
});
export const getAllProducts = TryCatch(async (req, res, next) => {
    const allProducts = await Product.find({}).lean().exec();
    if (!allProducts)
        return next(new ErrorHandler("No Products found", 400));
    return res.status(200).json({
        success: true,
        message: "All categories",
        allProducts,
    });
});
export const getSingleProduct = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler(`No product exists with id ${id}`, 400));
    }
    return res.status(200).json({
        success: true,
        message: `${product.name} is fetched`,
        product,
    });
});
export const updateProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    const product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler(`No product exists with id ${id}`, 404));
    }
    if (photo) {
        rm(product.photo, () => {
            console.log("Prev photo deleted");
        });
    }
    if (name)
        product.name = name;
    if (price)
        product.price = price;
    if (stock)
        product.stock = stock;
    if (category)
        product.category = category;
    await product.save();
    return res.status(200).json({
        success: true,
        message: `${product.name} updated successfully`,
        product,
    });
});
// Path: -app/v1/product/delete/:id
export const deleteProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
        return next(new ErrorHandler(`No product exists with id ${id}`, 404));
    rm(product.photo, () => {
        console.log("Product photo deleted");
    });
    await Product.deleteOne();
    return res.status(200).json({
        success: true,
        message: `${product?.name} deleted successfully`,
    });
});
export const getAllProductsWithFilter = TryCatch(async (req, res, next) => {
    const { search, price, category, sort } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_LIMIT) || 10;
    const skip = (page - 1) * limit;
    const baseQuery = {};
    if (search)
        baseQuery.name = { $regex: '.*' + search + '.*', $options: 'i' };
    if (price) {
        baseQuery.price = {
            $lte: Number(price),
        };
    }
    if (category) {
        baseQuery.category = category;
    }
    const productPromise = Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip)
        .lean()
        .exec();
    const [products, filteredOnlyProduct] = await Promise.all([
        productPromise,
        Product.find(baseQuery),
    ]);
    const totalPage = Math.ceil(filteredOnlyProduct.length / limit);
    return res.status(200).json({
        success: true,
        message: "All products",
        products,
        totalPage,
    });
});
