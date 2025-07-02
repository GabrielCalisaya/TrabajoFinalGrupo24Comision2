import { Routes, Route } from 'react-router-dom'
import Inicio from '../pages/Inicio.jsx'
import Favoritos from '../pages/Favoritos.jsx'
import DetalleProducto from '../pages/DetalleProducto.jsx'
import FormularioProducto from '../pages/FormularioProducto.jsx'
import AcercaDe from '../pages/AcercaDe.jsx'
import Papelera from '../pages/Papelera.jsx'
import NoEncontrada from '../pages/PaginaNoEncontrada.jsx'
import ProtectedRoute from '../components/ProteccionDeRutas.jsx'
import RutaAdmin from './RutaAdmin.jsx'
import RutaProtegidaInvitado from './RutaProtegidaInvitado.jsx'
import { InicioSesion } from '../pages/InicioSesion.jsx'
const AppRoutes = () => {
  return (
    // Solo las <Routes> y sus <Route>s
    <Routes>
      {/* Ruta de inicio de sesión (PUBLICA) */}
      <Route path='/' element={<InicioSesion />} />

      {/* RUTAS PROTEGIDAS: Envuelve estas rutas con ProtectedRoute */}
      <Route
        path='/inicio'
        element={
          <ProtectedRoute>
            <Inicio />
          </ProtectedRoute>
        }
      />
      <Route
        path='/favoritos'
        element={
          <RutaProtegidaInvitado>
          <ProtectedRoute>
            <Favoritos />
          </ProtectedRoute>
          </RutaProtegidaInvitado>  
        }
      />
      <Route
        path='/detalle/:id'
        element={
          <ProtectedRoute>
            <DetalleProducto />
          </ProtectedRoute>
        }
      />
      <Route
        path='formulario/:id'
        element={
          <RutaAdmin>
            <FormularioProducto />
          </RutaAdmin>
        }
      />
      <Route
        path='/formulario'
        element={
          <RutaAdmin>
            <FormularioProducto />
          </RutaAdmin>
        }
      />
      <Route
        path='/papelera'
        element={
          <RutaAdmin>
            <Papelera />
          </RutaAdmin>
        }
        />
      <Route
        path='acerca-de'
        element={
          <ProtectedRoute>
            <AcercaDe />
          </ProtectedRoute>
        }
      />

      {/* Ruta para manejar paginas no encontradas (PUBLICA) */}
      <Route path='*' element={<NoEncontrada />} />
    </Routes>
  );
};

export default AppRoutes;