import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({ //Define y exporta una constante productsSlice, que es el resultado de llamar a createSlice.
    name: "products", 
    initialState: [],//Define el estado inicial para este slice de Redux. El estado inicial es un array vacío, lo que sugiere que este slice gestionará una colección de productos.
    reducers: { //Esta propiedad es un objeto que contiene funciones "reducer" individuales
        setProducts: (_, action) => {
            return action.payload;
        },
        addProduct: (state, action) => {
            state.push(action.payload);
        },
        removeProduct: (state, action) => {
            return state.filter(product => product.id !== action.payload.id);
        },
        updateProduct: (state, action) => {
            const index = state.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        }
    }
});

export const { setProducts, addProduct, removeProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;