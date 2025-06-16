import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
//Acá realizamos la importacion de las páginas
//En esta página se mostrará el listado principal de productos
import Inicio from './pages/Inicio.jsx'
//Acá importamos el componente que mostrará los productos marcados como favoritos
import Favoritos from './pages/Favoritos.jsx'
// Importacion del componente que mostrará los detalles de un producto
import DetalleProducto from './pages/DetalleProducto.jsx'
// Importacion del formulario que servirá para crear y para editar
import FormularioProducto from './pages/FormularioProducto.jsx'
// Importación de la página "Acerca de"
import AcercaDe from './pages/AcercaDe.jsx'
// Importación de la página de error (404)
import NoEncontrada from './pages/PaginaNoEncontrada.jsx'
//Importación de los componentes de layout globales que se renderizarán en todas las páginasimport
import AppNavbar from './components/AppNavbar.jsx'
import Footer from './components/Footer.jsx'
//import { useTraerProductos } from './hooks/useTraerProductos.jsx'

import { InicioSesion } from './pages/InicioSesion.jsx'
function App() {
  const user = useSelector(state => state.user)

  //console.log(user, "user");

  return (
    <BrowserRouter>
      {/* agrege "flex-column" para que el div ocupe todo el alto de la pantalla y "min-vh-100" para que ocupe todo el alto de la pantalla*/}
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar se renderizara fuera de "Routes" para que aparezca en todas las paginas */}
        {user.isAuthenticated && (

          <AppNavbar />
        )}
        {/* agregue "flex-grow-1" para que el main ocupe todo el espacio disponible entre el navbar y el footer */}
        <main className="flex-grow-1">
          <Routes>
            {/* Ruta para el inicio */}
            <Route path='/' element={<InicioSesion />} />
            <Route path='/inicio' element={<Inicio />} />
            {/* Ruta para los elementos marcados en favoritos */}
            <Route path='/favoritos' element={<Favoritos />} />
            {/* Ruta para la página de detalle de un producto */}
            {/* Acá definimos la ruta con un parámetro dinámico ":id" para que la URL pueda variar siempre y cuando sea /producto/ */}
            <Route path='/detalle/:id' element={<DetalleProducto />} />
            {/* cambie de posicion esta ruta y la de formulario para evitar errores mas adelante */}
            {/* Ruta para el formulario de edición de un producto existente. También se utilizará el parametro dinamico :id para manejarnos con un producto específico para así editarlo */}
            <Route path='formulario/:id' element={<FormularioProducto />} />
            {/* Ruta para el formulario de creación de un nuevo producto */}
            <Route path='/formulario' element={<FormularioProducto />} />
            {/* Ruta para la página "Acerca De" */}
            <Route path='acerca-de' element={<AcercaDe />} />
            {/* Ruta para manejar páginas no encontradas */}
            <Route path='*' element={<NoEncontrada />} />
          </Routes>
        </main>
        {/* Footer se renderizá fuera de Routes para que aparezca en todas las páginas */}
        {user.isAuthenticated && (


          <Footer />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;

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