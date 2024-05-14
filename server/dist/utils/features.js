import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
import { Order } from "../models/order.js";
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
export const invalidateCache = async ({ product, order, admin, userId }) => {
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
        const orderKeys = ["all-orders", `my-orders-${userId}`];
        const orders = await Order.find({}).select("_id");
        orders.forEach((order) => {
            orderKeys.push(`order-${order._id}`);
        });
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
