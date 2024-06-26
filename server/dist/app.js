import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import dashboardRoute from "./routes/stats.js";
import { connectDB } from "./utils/features.js";
import NodeCache from "node-cache";
import morgan from "morgan";
// import cors from "cors";
const app = express();
// config({
//   path: "./.env",
// });
dotenv.config();
const PORT = process.env.PORT;
connectDB(process.env.MONGO_DB_URI || "");
export const myCache = new NodeCache();
//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.get("/", (req, res) => {
    res.send("Everything is working properly");
});
app.get("/test", (req, res) => {
    res.send("Testing route");
});
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
