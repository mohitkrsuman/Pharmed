import { user } from "./types";


export interface UserReducerInitialState{
   user: user | null;
   loading: boolean;
}