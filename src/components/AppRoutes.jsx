import { Routes, Route } from 'react-router-dom'
//Acá realizamos la importacion de las páginas
//En esta página se mostrará el listado principal de productos
import Inicio from '../pages/Inicio.jsx'
//Acá importamos el componente que mostrará los productos marcados como favoritos
import Favoritos from '../pages/Favoritos.jsx'
// Importacion del componente que mostrará los detalles de un producto
import DetalleProducto from '../pages/DetalleProducto.jsx'
// Importacion del formulario que servirá para crear y para editar
import FormularioProducto from '../pages/FormularioProducto.jsx'
// Importación de la página "Acerca de"
import AcercaDe from '../pages/AcercaDe.jsx'
// Importación de la página de error (404)
import Papelera from '../pages/Papelera.jsx'
import NoEncontrada from '../pages/PaginaNoEncontrada.jsx'
//Importación de los componentes de layout globales que se renderizarán en todas las páginasimport
//import { useTraerProductos } from './hooks/useTraerProductos.jsx'
//Importación del componente protector de rutas
import ProtectedRoute from '../components/ProteccionDeRutas.jsx'
import RutaAdmin from './RutaAdmin.jsx'
import RutaProtegidaInvitado from './RutaProtegidaInvitado.jsx'
import { InicioSesion } from '../pages/InicioSesion.jsx'
const AppRoutes = () => {
  return (
    // Solo las <Routes> y sus <Route>s
    <Routes>
      {/* Ruta de inicio de sesión (PÚBLICA) */}
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

      {/* Ruta para manejar páginas no encontradas (PÚBLICA) */}
      <Route path='*' element={<NoEncontrada />} />
    </Routes>
  );
};

export default AppRoutes;