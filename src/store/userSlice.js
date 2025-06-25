import { createSlice } from '@reduxjs/toolkit';
import usersData from '../data/usersData.json';

const initialState = {
    usuario: '',
    role: '',
    nombre: '',
    img: '',
    isAuthenticated: false,
    loginError: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { usuario, password } = action.payload;
            const usuarioEncontrado = usersData.find(user => user.usuario === usuario && user.password === password);
            // datos login
            if (usuarioEncontrado) {
                state.usuario = usuarioEncontrado.usuario;
                state.role = usuarioEncontrado.role;
                state.nombre = usuarioEncontrado.nombre; 
                state.img = usuarioEncontrado.img; 
                state.isAuthenticated = true;
                state.loginError = false;
            } else {
                // Limpii si los datos no son validos
                state.usuario = '';
                state.role = '';
                state.loginError = true;
                state.isAuthenticated = false;
            }
        },
        logout: (state) => {
            state.usuario = '';
            state.role = '';
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;