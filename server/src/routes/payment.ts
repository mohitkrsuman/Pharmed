import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { applyDiscount, newCoupon } from '../controllers/payment.js';

const app = express.Router();

// Route -/api/v1/payment/coupon/new
app.post("/coupon/new", newCoupon);

// Route -/api/v1/payment/coupon/new
app.get("/discount", applyDiscount);


export default app;