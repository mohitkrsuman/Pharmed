import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts } from '../controllers/stats.js';

const app = express.Router();

// route - /api/v1/dashboard/new
app.get("/stats", adminOnly, getDashboardStats);

// route - /api/v1/dashboard/pie
app.get("/pie", adminOnly, getPieCharts);

// route - /api/v1/dashboard/bar
app.get("/bar", adminOnly, getBarCharts);

// route - /api/v1/dashboard/pie
app.get("/line", adminOnly, getLineCharts);


export default app;