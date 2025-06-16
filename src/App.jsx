import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Importamos el componente de rutas
import AppRoutes from './components/AppRoutes.jsx';

//Importación de componentes de layout
import AppNavbar from './components/AppNavbar.jsx';
import Footer from './components/Footer.jsx';

function App() {
  //Obitene el estado del usuario desde Redux
  const user = useSelector(state => state.user);

  return (
    <BrowserRouter>
      {/* Agregamos "flex-column" para que el div ocupe todo el alto de la pantalla y "min-vh-100" para que ocupe todo el alto de la pantalla */}
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar se renderizará fuera de "Routes" para que aparezca en todas las páginas
            Solo se muestra si el usuario está autenticado */}
        {user.isAuthenticated && <AppNavbar />}

        {/* Agregué "flex-grow-1" para que el main ocupe todo el espacio disponible entre el navbar y el footer */}
        <main className="flex-grow-1">
          {/* Aquí renderizamos el nuevo componente que contiene todas tus rutas */}
          <AppRoutes />
        </main>

        {/* Footer se renderizará fuera de Routes para que aparezca en todas las páginas
            Solo se muestra si el usuario está autenticado */}
        {user.isAuthenticated && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;