import { rm } from "fs";
import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";
// revalidate on new update or delete product & new order
export const getLatestProducts = TryCatch(async (req, res, next) => {
    let products = [];
    if (myCache.has("latestProducts")) {
        products = JSON.parse(myCache.get("latestProducts"));
    }
    else {
        products = await Product.find({})
            .sort({ createAt: -1 })
            .limit(10)
            .lean()
            .exec();
        myCache.set("latestProducts", JSON.stringify(products));
    }
    if (!products)
        return next(new ErrorHandler("No products found", 400));
    return res.status(200).json({
        success: true,
        message: "Latest products",
        products,
    });
});
// revalidate on new update or delete product & new order
export const getAllCategories = TryCatch(async (req, res, next) => {
    let categories;
    if (myCache.has("categories")) {
        categories = JSON.parse(myCache.get("categories"));
    }
    else {
        categories = await Product.find({}).distinct("category").exec();
        myCache.set("categories", JSON.stringify(categories));
    }
    if (!categories)
        return next(new ErrorHandler("No categories found", 400));
    return res.status(200).json({
        success: true,
        message: "All categories",
        categories,
    });
});
export const getAllProducts = TryCatch(async (req, res, next) => {
    let allProducts;
    if (myCache.has("allProducts")) {
        allProducts = JSON.parse(myCache.get("allProducts"));
    }
    else {
        allProducts = await Product.find({}).lean().exec();
        myCache.set("allProducts", JSON.stringify(allProducts));
    }
    if (!allProducts)
        return next(new ErrorHandler("No Products found", 400));
    return res.status(200).json({
        success: true,
        message: "AlL products",
        allProducts,
    });
});
export const getSingleProduct = TryCatch(async (req, res, next) => {
    let product;
    const id = req.params.id;
    if (myCache.has(`product-${id}`)) {
        product = JSON.parse(myCache.get(`product-${id}`));
    }
    else {
        product = await Product.findById(id);
        myCache.set(`product-${id}`, JSON.stringify(product));
    }
    if (!product) {
        return next(new ErrorHandler(`No product exists with id ${id}`, 400));
    }
    return res.status(200).json({
        success: true,
        message: `${product.name} is fetched`,
        product,
    });
});
// need of revalidating
export const newProduct = TryCatch(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo)
        return next(new ErrorHandler("Please provide a photo for this product", 400));
    if (!name || !price || !stock || !category) {
        rm(photo.path, () => console.log("Photo deleted"));
        return next(new ErrorHandler("Please provide all fields", 400));
    }
    const product = await Product.create({
        name,
        photo: photo?.path,
        price,
        stock,
        category: category.toLowerCase(),
    });
    await invalidateCache({ product: true });
    return res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
    });
});
export const updateProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    const product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler(`No product exists with id ${id}`, 404));
    }
    if (photo) {
        rm(product.photo, () => {
            console.log("Prev photo deleted");
        });
    }
    if (name)
        product.name = name;
    if (price)
        product.price = price;
    if (stock)
        product.stock = stock;
    if (category)
        product.category = category;
    await product.save();
    await invalidateCache({ product: true, productId: String(product._id) });
    return res.status(200).json({
        success: true,
        message: `${product.name} updated successfully`,
        product,
    });
});
// Path: -app/v1/product/delete/:id
export const deleteProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
        return next(new ErrorHandler(`No product exists with id ${id}`, 404));
    rm(product.photo, () => {
        console.log("Product photo deleted");
    });
    await product.deleteOne();
    await invalidateCache({
        product: true,
        productId: String(product._id),
        order: true,
    });
    return res.status(200).json({
        success: true,
        message: `${product?.name} deleted successfully`,
    });
});
export const getAllProductsWithFilter = TryCatch(async (req, res, next) => {
    const { search, price, category, sort } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_LIMIT) || 10;
    const skip = (page - 1) * limit;
    const baseQuery = {};
    if (search)
        baseQuery.name = {
            $regex: search,
            $options: "i",
        };
    if (price) {
        baseQuery.price = {
            $lte: Number(price),
        };
    }
    if (category) {
        baseQuery.category = category;
    }
    const productPromise = Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip)
        .lean()
        .exec();
    const [products, filteredOnlyProduct] = await Promise.all([
        productPromise,
        Product.find(baseQuery),
    ]);
    if (!products) {
        return next(new ErrorHandler("No products found", 400));
    }
    const totalPage = Math.ceil(filteredOnlyProduct.length / limit);
    return res.status(200).json({
        success: true,
        message: "All products",
        products,
        totalPage,
    });
});
// const deleteFakers = async() => {
//    const products = await Product.find({}).skip(2).lean().exec();
//    for(let i = 0; i < products.length; i++){
//       const product = products[i];
//       await Product.deleteOne(product);
//    }
//    console.log("Fake products deleted successfully");
// }
// deleteFakers();
// const generateRandomProducts = async(count: number) => {
//   const products = [];
//   for(let i = 0; i < count; i++){
//      const product = {
//        name: faker.commerce.productName(),
//        photo: "uploads\\cba752-c1fc-449c-be2b-ab1417912cc3.png",
//        price: faker.commerce.price({min: 1500, max: 43343, dec: 0}),
//        stock: faker.commerce.price({min: 0, max: 100, dec: 0}),
//        category: faker.commerce.department(),
//        createdAt: new Date(faker.date.past()),
//        updatedAt: new Date(faker.date.recent()),
//        _v: 0,
//      }
//      products.push(product);
//   }
//   await Product.insertMany(products);
//   console.log("Products generated successfully");
// }
// generateRandomProducts(20);
