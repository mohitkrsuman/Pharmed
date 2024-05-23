import { user } from "./types";

export type MessageResponse = {
   success: boolean;
   message: string
}

export type UserResponse = {
   success: boolean;
   user: user
}