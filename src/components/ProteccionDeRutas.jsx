import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';


const ProtectedRoute =({ children }) => {
    //Obtener el estado de autenticación del usuario desde Redux
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    //Obtener la ubicación actual para guardar la ruta a la que se intentó acceder
    const location = useLocation();

    //Si el usuario NO esta autenticado, redirige a la página de inicio de sesión
    //Se usa 'state: { from: location }' para guardar la ruta original y poder redirigir al usuario de vuelta a esa página después de iniciar sesión.
    
    if(!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace/>
    }

    // Si el usuario está autenticado, renderiza los componentes hijos
    return children;
};

export default ProtectedRoute;