import { BrowserRouter, Routes, Route} from 'react-router-dom'

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
import AppNavbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { useTraerProductos } from './hooks/useTraerProductos.jsx'

function App() {
  
  return (
    <BrowserRouter>
    {/* Navbar se renderizará fuera de "Routes" para que aparezca en todas las páginas */}
    <AppNavbar/>

    <Routes>

      {/* Ruta para el inicio */}
      <Route path='/' element={<Inicio/>}/>

      {/* Ruta para los elementos marcados en favoritos */}
      <Route path='/favoritos' element={<Favoritos/>}/>

      {/* Ruta para la página de detalle de un producto */}
      {/* Acá definimos la ruta con un parámetro dinámico ":id" para que la URL pueda variar siempre y cuando sea /producto/ */}
      <Route path='/producto/:id' element={<DetalleProducto/>}/>

      {/* Ruta para el formulario de creación de un nuevo producto */}
      <Route path='/formulario' element={<FormularioProducto/>}/>

      {/* Ruta para el formulario de edición de un producto existente. También se utilizará el parametro dinamico :id para manejarnos con un producto específico para así editarlo */}
      <Route path='formulario/:id' element={<FormularioProducto/>}/>

      {/* Ruta para la página "Acerca De" */}
      <Route path='acerca-de' element={<AcercaDe/>}/>

      {/* Ruta para manejar páginas no encontradas */}
      <Route path='*' element={<NoEncontrada/>}/>

    </Routes>

    {/* Footer se renderizá fuera de Routes para que aparezca en todas las páginas */}
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
//el provider envuelve la aplicacion desde el main. luego en productossSlice se crea la logica para manejar el estado global
// y en el store se crea el esstado inicial de los productos 
//Dentro de hooks se define un hook personalizado de React llamado useTraerProductos. Su propósito es encapsular la lógica para obtener
//  una lista de productos de una API externa y almacenarlos en el estado global de Redux.
//  También maneja los estados de carga y error.
//Se crea un componente llamado SpinnerLoad que muestra u oculta un spinner (indicador de carga)  basado en una prop open.