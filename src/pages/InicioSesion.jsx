import { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';

export const InicioSesion = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const error = useSelector(state => state.user.loginError)
    const autenticado = useSelector(state => state.user.isAuthenticated)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Obtener los estados relevanted de Redux
    const loginError = useSelector(state => state.user.loginError); 
    const isAuthenticated = useSelector(state => state.user.isAuthenticated); // 


    // Determinamos la ruta a la cual nos va a redirigir despues del login
    const from = location.state?.from?.pathname || '/inicio';

    useEffect(() => {
        // Este useEffect se ejecuta cada vez que 'isAuthenticated' cambia.
        console.log("Estado de autenticación actual en useEffect:", isAuthenticated);
        if (isAuthenticated) {
            console.log("Usuario autenticado, redirigiendo a:", from);
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]); // Dependencias del useEffect

   const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Intentando iniciar sesión con:", { email, password });

        // ¡IMPORTANTE!: Solo envía email y password.
        // El reducer 'setUser' en userSlice.js tiene la lógica de validación
        // y establecerá 'isAuthenticated' y 'loginError' basado en esas credenciales.
        dispatch(setUser({ email, password }));

        // No necesitamos lógica condicional aquí para el dispatch de setUser,
        // ya que el userSlice.js lo maneja internamente.
        // Los console.log del useEffect nos dirán si isAuthenticated cambió.

        // Limpia los campos del formulario después del intento
        setEmail('');
        setPassword('');
    };

    return (
        <form style={{ display: "flex", flexDirection: "column", gap: "50px", width: "50%", margin: "50px" }} onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {error && (
                <h2>Credenciales invalidas</h2>
            )}
        </form>
    );
};