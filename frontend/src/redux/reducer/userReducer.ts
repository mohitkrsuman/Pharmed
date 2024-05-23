import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer-types";
import { user } from "../../types/types";

const initialState: UserReducerInitialState = {
   user: null,
   loading: true
};

export const userReducer = createSlice({
   name: "user",
   initialState,
   reducers: {
     userExist: (state, action: PayloadAction<user>) => {
        state.loading = false;
        state.user = action.payload;
     },
     userNotExist : (state) => {
       state.loading = false;
       state.user = null;
     }
   }
});

export const { userExist, userNotExist } = userReducer.actions;
