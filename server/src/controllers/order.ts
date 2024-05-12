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
      // populate the user field and retreive only the name field
      orders = await Order.find({}).populate("user", "name");
      myCache.set(key, JSON.stringify(orders));
   }

   return res.status(200).json({
     success: true,
     message: "All orders fetched successfully",
     orders
   })
});

export const getSingleOrder = TryCatch(async(req, res, next) => {
    const { id } = req.params;
    const key = `order-${id}`;

    let order;

    if(myCache.has(key)){
      order = JSON.parse(myCache.get(key) as string);
    }else{
      order = await Order.findById(id).populate("user", "name");
      if(!order){
         return next(new ErrorHandler("Order not found", 404));
      }
      myCache.set(key, JSON.stringify(order));
    }

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      order
    });
});