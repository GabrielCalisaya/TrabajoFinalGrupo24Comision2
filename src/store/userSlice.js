import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    usuario: '',
    role: '',
    isAuthenticated: false,
    loginError: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { usuario, password } = action.payload;

            // datos login
            if (usuario === 'admin' && password === 'admin') {
                state.usuario = usuario;
                state.role = 'ADMIN';
                state.isAuthenticated = true;
                state.loginError = false;
            } else if (usuario == "user" && password === "user") {
                state.usuario = usuario;
                state.role = 'USER';
                state.isAuthenticated = true;
                state.loginError = false;
            } else {
                // Limpii si los datos no son validos
                state.usuario = '';
                state.role = '';
                state.loginError = true,
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