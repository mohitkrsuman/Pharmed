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

export type ProductResponse = {
   success: boolean;
   message?: string;
   product: Product;
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
   search: string;
   sort: string;
}

export type NewProductRequest = {
   id: string;
   formData: FormData;
}

export type UpdateProductRequest = {
   userId: string;
   productId: string;
   formData: FormData;
}

export type DeleteProductRequest = {
   userId: string;
   productId: string;
}