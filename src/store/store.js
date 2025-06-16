import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Usa localStorage

import productsReducer from "./productosSlice";
import favoritosReducer from "./favoritosSlice";
import userReducer from "./userSlice";

// Combino aca los reducers que voy a usar en el store
const rootReducer = combineReducers({
    products: productsReducer,
    favoritos: favoritosReducer,
    user: userReducer,
});

// Configuracion que mantiene SOLO el usuario
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Exportá el store y el persistor
export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);