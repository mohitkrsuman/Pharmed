import { CartItem, ShippingInfo, user } from "./types";


export interface UserReducerInitialState{
   user: user | null;
   loading: boolean;
}

export interface CartReducerInitialState{
   loading: boolean;
   cartItems: CartItem[];
   subtotal: number;
   tax: number;
   shippingCharges: number;
   discount: number;
   total: number;
   shippingInfo: ShippingInfo
} 