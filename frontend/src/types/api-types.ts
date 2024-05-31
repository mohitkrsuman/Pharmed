import { Product, user } from "./types";


export type customError = {
   status: number;
   data: {
      message: string;
      success: boolean
   }
}

export type MessageResponse = {
   success: boolean;
   message: string
}

export type UserResponse = {
   success: boolean;
   user: user
}

export type AllProductsResponse = {
   success: boolean;
   message?: string;
   allProducts: Product[];
}

export type CategoriesResponse = {
   success: boolean;
   message?: string;
   categories: string[]
}

export type SearchProductsResponse = {
   success: boolean;
   message?: string;
   products: Product[];
   totalPage: number;
}

export type SearchProductsRequest = {
   price: number;
   page: number;
   category: string;
   name: string;
   sort: string;
}