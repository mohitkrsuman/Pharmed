import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
export const connectDB = async () => {
    try {
        const dbConnect = await mongoose.connect("mongodb://localhost:27017", {
            dbName: "TscEcom",
        });
        if (dbConnect) {
            console.log(`Database connected successfully ${dbConnect.connection.host}`);
        }
    }
    catch (err) {
        console.log("Issue in connecting with database");
    }
};
export const invalidateCache = async ({ product, order, admin, }) => {
    if (product) {
        const productKeys = [
            "categories",
            "allProducts",
            "latestProducts",
        ];
        const products = await Product.find({}).select("_id");
        products.forEach((product) => {
            productKeys.push(`product-${product._id}`);
        });
        myCache.del(productKeys);
    }
    if (order) {
    }
    if (admin) {
    }
};
