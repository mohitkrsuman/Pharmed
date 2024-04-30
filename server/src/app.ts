import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import userRoutes from "./routes/user.js";
import productRoute from "./routes/products.js"
import { connectDB } from "./utils/features.js";
import NodeCache from "node-cache";

// import cors from "cors";

const app = express();
const PORT = 4000;

connectDB();

export const myCache = new NodeCache();

//middlewares
dotenv.config();
app.use(express.json());
// app.use(cors());

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoute);

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
