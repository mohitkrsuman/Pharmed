import express from "express";
import { getAllCategories, getAllProducts, getLatestProducts, getSingleProduct, newProduct, updateProduct, } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";
const app = express.Router();
// -api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);
// -api/v1/product/latest
app.get("/latest", adminOnly, getLatestProducts);
// -api/v1/product/categories
app.get("/categories", adminOnly, getAllCategories);
// -api/v1/product/admin-products
app.get("/admin-products", adminOnly, getAllProducts);
// -api/v1/product/:id?id=adminId
app.route("/:id").get(adminOnly, getSingleProduct).put(updateProduct);
export default app;
