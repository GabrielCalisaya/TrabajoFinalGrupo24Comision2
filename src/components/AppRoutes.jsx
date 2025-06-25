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

//el provider envuelve la aplicacion desde el main. luego en productossSlice se crea la logica para manejar el estado global
// y en el store se crea el esstado inicial de los productos
//Dentro de hooks se define un hook personalizado de React llamado useTraerProductos. Su propósito es encapsular la lógica para obtener
//  una lista de productos de una API externa y almacenarlos en el estado global de Redux.
//  También maneja los estados de carga y error.
//Se crea un componente llamado SpinnerLoad que muestra u oculta un spinner (indicador de carga)  basado en una prop open.

// Explicacion de favoritos
// Se utiliza Redux para guardar en el estado global los IDs de los productos marcados como favoritos.
// Al hacer clic en el ícono de corazón, se agrega o quita el ID del producto en la lista de favoritos.
// La página de Favoritos filtra y muestra solo los productos cuyos IDs están en la lista de favoritos.

// Explicacion de DetalleProducto
// La página de detalle muestra información completa de un producto específico.
// Al hacer clic en "Ver más detalles", se navega a la página de detalle usando el ID del producto en la URL.
// En la página de detalle, se busca el producto por su ID en el estado global y se muestra toda su información.
// Desde esta página también se puede agregar o quitar el producto de favoritos usando el mismo botón de corazón.