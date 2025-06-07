import ProductoCarta from "../components/ProductosCarta";

function Inicio() {

    const productoDePrueba = {
        id: 1,
        title: "Producto Ejemplo",
        price: 109.92,
        description: "Esta es una descripción de ejemplo",
        category: "Electrónica",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: { rate: 3.9, count: 120}
    }
  return (
    <div>
      <h2>Página de Inicio de Productos</h2>
      <p>Aquí se listarán todas las tarjetas de productos.</p>

      {/* Le pasamos el objeto "productoDePrueba" como prop "producto" al componente ProductoCarta */}
      <ProductoCarta producto={productoDePrueba}/>
    </div>
  );
}


export default Inicio;