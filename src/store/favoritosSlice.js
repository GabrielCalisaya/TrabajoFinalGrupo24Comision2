import { createSlice } from '@reduxjs/toolkit';

// Estado inicial: objeto con listas de favoritos por usuario
// { usuario1: [id1, id2], usuario2: [id3, id4], ... }
const initialState = {};

const favoritosSlice = createSlice({
    name: 'favoritos',
    initialState,
    reducers: {
        agregarFavorito: (state, action) => {
            const { usuario, idProducto } = action.payload;
            //si no tiene lista de fav le agrega una
            if (!state[usuario]) {
                state[usuario] = [];
            }
            //si el producto no existe en la lista, lo agrega mediante el push.
            if (!state[usuario].includes(idProducto)) {
                state[usuario].push(idProducto);
            }
        },
        quitarFavorito: (state, action) => {
            const { usuario, idProducto } = action.payload;
            if (state[usuario]) {
                //si el producto esta en la lista, lo elimina por medio de un filtro
                state[usuario] = state[usuario].filter(id => id !== idProducto);
            }
        },
    },
});

export const { agregarFavorito, quitarFavorito } = favoritosSlice.actions;
export default favoritosSlice.reducer;