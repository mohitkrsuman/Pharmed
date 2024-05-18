import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { applyDiscount, deleteCoupons, getAllCoupons, newCoupon } from '../controllers/payment.js';

const app = express.Router();

// Route -/api/v1/payment/coupon/new
app.post("/coupon/new", newCoupon);

// Route -/api/v1/payment/coupon/discount
app.get("/discount", applyDiscount);

// Route -/api/v1/payment/coupon/allCoupons
app.get("/coupon/all", getAllCoupons);

// Route -/api/v1/payment/coupon/deleteCoupon
app.delete("/coupon/:id", deleteCoupons);


export default app;