import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
export const connectDB = async (uri) => {
    try {
        const dbConnect = await mongoose.connect(uri, {
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
export const invalidateCache = async ({ product, order, admin, userId, orderId, productId, }) => {
    if (product) {
        const productKeys = [
            "categories",
            "allProducts",
            "latestProducts",
        ];
        if (typeof productId === "string") {
            productKeys.push(`product-${productId}`);
        }
        if (typeof productId === "object") {
            productId.forEach((id) => {
                productKeys.push(`product-${id}`);
            });
        }
        console.log("deleted keys");
        myCache.del(productKeys);
    }
    if (order) {
        const orderKeys = [
            "all-orders",
            `my-orders-${userId}`,
            `order-${orderId}`,
        ];
        myCache.del(orderKeys);
    }
    if (admin) {
    }
};
export const reduceStock = async (orderItems) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if (!product) {
            throw new Error("Product not found");
        }
        product.stock -= order.quantity;
        await product.save();
    }
};
