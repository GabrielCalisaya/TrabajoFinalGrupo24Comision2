import { createSlice, createSelector } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload.map(p => ({ ...p, estado: p.estado || 'activo' }));
        },
        addProduct: (state, action) => {
            state.push({ ...action.payload, estado: 'activo' });
        },
        removeProduct: (state, action) => {
            const index = state.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state[index].estado = 'inactivo';
            }
        },
        updateProduct: (state, action) => {
            const index = state.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state[index] = { ...action.payload, estado: state[index].estado };
            }
        },
        restoreProduct: (state, action) => {
            const index = state.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state[index].estado = 'activo';
            }
        }
    }
});

export const { setProducts, addProduct, removeProduct, updateProduct, restoreProduct } = productsSlice.actions;

const selectProductsState = (state) => state.products;
export const selectActiveProducts = createSelector(
    [selectProductsState],
    (products) => products.filter(product => product.estado !== 'inactivo')
);

export default productsSlice.reducer;