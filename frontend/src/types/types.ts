export interface user{
   name: string;
   email: string;
   photo: string;
   gender: string;
   role: string;
   dob: string;
   _id: string;
}


export interface Product {
   name: string;
   photo: string;
   price: number;
   stock: number;
   category: string;
   _id: string;
 }

 
export type CartItem = {
   productId: string;
   photo: string;
   name: string;
   price: number;
   quantity: number;
   stock: number;
 }

 export type ShippingInfo = {
   address: string;
   city: string;
   state: string;
   country: string;
   pinCode: string;
 }