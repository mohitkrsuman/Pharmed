import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";

export const getDashboardStats = TryCatch(async (req, res, next) => {
  let stats = {};

  if (myCache.has("admin-stats")) {
    stats = JSON.parse(myCache.get("admin-stats") as string);
  } else {
    const today = new Date();
    const thisMonth = {
      start: new Date(today.getFullYear(), today.getMonth(), 1),
      end: today
    }
    let startOfLastMonth, endOfLastMonth;
    if (today.getMonth() === 1) {
      startOfLastMonth = new Date(today.getFullYear() - 1, 12, 1);
      endOfLastMonth = new Date(today.getFullYear(), 12, 0);
    } else {
      startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    }
    const lastMonth = {
      start: startOfLastMonth,
      end: endOfLastMonth
    }

    const thisMonthProduct = await Product.find({
      createdAt:{
         $gte: thisMonth.start,
         $lte: thisMonth.end
      }
    });
    
   //  console.log(endOfLastMonth.toDateString());
  }


  return res.status(200).json({
    success: true,
    stats,
  });
});

export const getPieCharts = TryCatch(async (req, res, next) => {});

export const getBarCharts = TryCatch(async (req, res, next) => {});

export const getLineCharts = TryCatch(async (req, res, next) => {});
