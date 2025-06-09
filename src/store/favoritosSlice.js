import { createSlice } from '@reduxjs/toolkit';

// Slice para manejar los favoritos
const favoritosSlice = createSlice({
    name: 'favoritos',
    initialState: [],
    reducers: {
        // Acción para agregar un favorito si no existe
        agregarFavorito: (state, action) => {
            if (!state.includes(action.payload)) {
                state.push(action.payload);
            }
        },
        // Acción para quitar un favorito
        quitarFavorito: (state, action) => {
            return state.filter(id => id !== action.payload);
        },
    },
});

// Exportamos las acciones y el reducer
export const { agregarFavorito, quitarFavorito } = favoritosSlice.actions;
export default favoritosSlice.reducer;