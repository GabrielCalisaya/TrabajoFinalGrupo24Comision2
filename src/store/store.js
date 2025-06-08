import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productosSlice";
export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
})
