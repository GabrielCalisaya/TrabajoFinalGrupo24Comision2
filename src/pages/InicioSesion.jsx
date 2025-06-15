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

    useEffect(() => {

        if (autenticado) {
            navigate("/inicio")
        }
    }, [autenticado])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setUser({ email, password }));
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