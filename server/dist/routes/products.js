import express from "express";
import { deleteProduct, getAllCategories, getAllProducts, getAllProductsWithFilter, getLatestProducts, getSingleProduct, newProduct, updateProduct, } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";
const app = express.Router();
// -api/v1/product/all
app.get("/all", getAllProductsWithFilter);
// -api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);
// -api/v1/product/latest
app.get("/latest", getLatestProducts);
// -api/v1/product/categories
app.get("/categories", getAllCategories);
// -api/v1/product/admin-products
app.get("/admin-products", adminOnly, getAllProducts);
// -api/v1/product/:id?id=adminId
app
    .route("/:id")
    .get(getSingleProduct)
    .put(adminOnly, singleUpload, updateProduct)
    .delete(adminOnly, deleteProduct);
export default app;
