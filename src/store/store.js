// Importa las funciones principales de redux toolkit y redux-persist
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Usa localStorage por defecto
// Trae los reducers que vas a usar en el store
import productsReducer from "./productosSlice";
import favoritosReducer from "./favoritosSlice";
import userReducer from "./userSlice";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";

// Junta todos los reducers en uno solo llamado rootReducer
const rootReducer = combineReducers({
    products: productsReducer,    // Estado para productos
    favoritos: favoritosReducer,  // Estado para favoritos
    user: userReducer,            // Estado para usuario
});

// Configuracion para que redux-persist solo guarde el estado de usuario
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"], // Solo guarda el slice user
};

// Aplica la persistencia al rootReducer usando la config de arriba
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Crea el store usando el reducer con persistencia
// Agrega una config especial al middleware para evitar los warnings de serializacion de redux-persist
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignora estas acciones internas de redux-persist para que no salga el warning de valores no serializables
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Crea el persistor, lo vas a usar con el Provider de redux-persist
export const persistor = persistStore(store);