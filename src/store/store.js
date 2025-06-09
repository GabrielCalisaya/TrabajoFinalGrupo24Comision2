// Importación necesaria para crear el store de Redux
import { configureStore } from "@reduxjs/toolkit";

// Importación de los reducers de productos y favoritos
import productsReducer from "./productosSlice";
import favoritosReducer from "./favoritosSlice";

// Crea y exporta el store de Redux, combinando los reducers de productos y favoritos
export const store = configureStore({
    reducer: {
        products: productsReducer,
        favoritos: favoritosReducer,
    },
});