import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/utility-class.js";

export const newCoupon = TryCatch(async(req, res, next) => {
   const { coupon, amount } = req.body;

   if(!coupon || !amount){
      return next(new ErrorHandler("Please enter both coupon and amount", 400));
   }

   await Coupon.create({ code: coupon, amount });

   return res.status(201).json({
      success: true,
      message: `Coupon ${coupon} created successfully`
   });
});

export const applyDiscount = TryCatch(async(req, res, next) => {
   const { coupon } = req.query;
   const discount = await Coupon.findOne({ code: coupon });

   if(!discount){
      return next(new ErrorHandler("Invalid coupon code", 400));
   }

   return res.status(200).json({
      success: true,
      discount: discount.amount + "rs discount applied successfully"
   });
});


export const getAllCoupons = TryCatch(async(req, res, next) => {
   const coupons = await Coupon.find({});

   return res.status(200).json({
      success: true,
      coupons
   });
});