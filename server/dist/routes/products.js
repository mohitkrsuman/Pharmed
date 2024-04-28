import express from 'express';
import { getLatestProducts, newProduct } from '../controllers/product.js';
import { singleUpload } from '../middlewares/multer.js';
import { adminOnly } from '../middlewares/auth.js';
const app = express.Router();
app.post("/new", adminOnly, singleUpload, newProduct);
app.get("/latest", adminOnly, getLatestProducts);
export default app;
