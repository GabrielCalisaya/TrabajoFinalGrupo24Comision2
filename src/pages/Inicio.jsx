import { useSelector } from "react-redux";
import ProductoCarta from "../components/ProductosCarta";
import {useTraerProductos} from "../hooks/useTraerProductos";
import { SpinnerLoad } from "../components/SpinnerLoad";

function Inicio() {

   // SOLO HAGO LA PETICION A LA API AQUI UNICAMENTE Y MANDO COMO PROP EL ESTADO DE CARGA O ERROR...
    const { loading, error } = useTraerProductos();
  // SE USA EL USESELECTOR PARA TRAER LOS PRODUCTOS DEL STORE(SE PUEDE USAR EN CUALQUIER COMPONENTE QUE ESTE DENTRO DEL PROVIDER)
  const products = useSelector((state) => state.products);

  // validar errores en la carga de productos
  if (error) {
    return <div>Error al cargar los productos: </div>;
  }
  return (
    <>
      {/* SE CREO UN COMPONENTE SPINNER PARA LA CARGA DE DATA QUE VIENE LA API */}

      {loading ? <SpinnerLoad open={loading} ></SpinnerLoad> : (
        <div>
          <h2>Página de Inicio de Productos</h2>
          <p>Aquí se listarán todas las tarjetas de productos.</p>
          {/* solo se puso el flex para que se vean en linea, pero el footer no deja ver al final asi que agregamos un margin bottom */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center", gap: "20px", marginBottom: "100px" }}>
            {products.map((producto) => {
              return (
                // {/* Le pasamos el objeto "productoDePrueba" como prop "producto" al componente ProductoCarta */ }
                < ProductoCarta key={producto.id} producto={producto} />
              )
            })}
          </div>


        </div>
      )}

    </>

  );
}


export default Inicio;