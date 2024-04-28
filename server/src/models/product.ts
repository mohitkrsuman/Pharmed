import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
    },
    photo: {
      type: String,
      required: [true, "Please provide a photo for this product"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price for this product"],
    },
    stock: {
      type: Number,
      required: [true, "Please provide stock for this product"],
    },
    category: {
      type: String,
      required: [true, "Please provide category for this product"],
      trim: true
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
