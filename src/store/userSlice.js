import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    role: '',
    isAuthenticated: false,
    loginError: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { email, password } = action.payload;

            // Simulación de login hardcodeado
            if (email === 'admin@gmail.com' && password === 'admin123') {
                state.email = email;
                state.role = 'ADMIN';
                state.isAuthenticated = true;
            } else if (email == "user@gmail.com" && password === "passuser" || email == "a@gmail.com" && password == "p") {
                state.email = email;
                state.role = 'USER';
                state.isAuthenticated = true;
            } else {
                // Limpia si los datos no son válidos
                state.email = '';
                state.role = '';
                state.loginError = true,
                    state.isAuthenticated = false;
            }
        },
        logout: (state) => {
            state.email = '';
            state.role = '';
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;