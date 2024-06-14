import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem } from "../../types/types";

const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  tax: 0,
  discount: 0,
  shippingCharges: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  total: 0,
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
      const idx = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (idx !== -1) {
        state.cartItems[idx] = action.payload;
      } else {
        state.cartItems.push(action.payload);
        state.loading = false;
      }
    },
    removeCartItems: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      state.loading = false;
    },
    calculatePrice: (state) => {
      const subtotal = state.cartItems.reduce(
        (total, item) => item.price * item.quantity + total,
        0
      );
      state.subtotal = subtotal;
      state.shippingCharges =
        state.cartItems.length > 0 ? (state.subtotal > 1000 ? 0 : 200) : 0;
      state.tax = Math.round(state.subtotal * 0.18);
      state.total =
        state.subtotal + state.tax + state.shippingCharges - Number(state.discount);
    },
    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
  },
});

export const { addToCart, removeCartItems, calculatePrice, discountApplied } =
  cartReducer.actions;
