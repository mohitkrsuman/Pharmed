import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";

export const newOrder = TryCatch(
  async (req: Request<{}, {}, NewOrderRequestBody>, res, next) => {
    const {
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    } = req.body;

    if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total) {
      return next(new ErrorHandler("Please enter all fields!", 400));
    }

    await Order.create({
      shippingInfo,
      orderItems,
      user,
      subtotal,
      shippingCharges,
      discount,
      tax,
      total,
    });

    await reduceStock(orderItems);
    await invalidateCache({ product: true, order: true, admin: true });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
    });
  }
);

export const myOrders = TryCatch(async (req, res, next) => {
   const { id: user } = req.query;
   let orders = [];

   const key = `my-orders-${user}`;

   if(myCache.has(key)){
      orders = JSON.parse(myCache.get(key) as string);
   }else{
      orders = await Order.find({ user });
      myCache.set(key, JSON.stringify(orders));
   }


   return res.status(200).json({
     success: true,
     message: "orders fetched successfully",
     orders,
   });
});

export const allOrders = TryCatch(async(req, res, next) => {
   const key = `all-orders`;

   let orders = [];
   if(myCache.has(key)){
     orders = JSON.parse(myCache.get(key) as string);
   }else{
     orders = await Order.find({});
      myCache.set(key, JSON.stringify(orders));
   }

   return res.status(200).json({
     success: true,
     message: "All orders fetched successfully",
     orders
   })
});