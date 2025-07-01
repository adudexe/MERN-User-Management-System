import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../services/Slice/UserLogin";


export const store = configureStore({
    reducer:{
        auth:loginReducer
    }
})


export type RootState = ReturnType< typeof store.getState >
export type dispatchState = typeof store.dispatch