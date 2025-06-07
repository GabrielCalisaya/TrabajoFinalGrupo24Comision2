import { Card, Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function ProductoCarta({ producto }) {

    // ESTO FUE HECHO A MODO DE EJEMPLO, AL COMPAÑERO QUE LE TOQUE TRABAJAR CON LA API DEBE MODIFICAR LA LÓGICA DE ESTE COMPONENTE
    const { id, image, title, price, description, category } = producto || {};
    return (
    // El componente Card de React Bootstrap representa la tarjeta individual de un producto.
    <Card style={{ width: '18rem', margin: '10px' }}>
      
      <Card.Img variant='top' src={image || "https://via.placeholder.com/150"} alt={title || "Imagen del Producto"}/>

      <Card.Body>
       
        <Card.Title>{title || "Nombre del Producto"}</Card.Title>
        <Card.Text>
          
          <strong>Precio: ${price ? price.toFixed(2) : "XX.XX"}</strong><br />
         
          <strong>Descripción: {description ? description.substring(0, 50) + '...' : "Breve Descripción..."}</strong> <br />
         
          <strong>Categoría: {category || "Categoría del producto"}</strong>
        </Card.Text>

        <div className='d-flex justify-content-between align-items-center'>
          
          <Button variant='primary' as={NavLink} to={`/producto/${id}`}>
            Ver más detalles
          </Button>

          <span>❤️ Favorito</span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductoCarta;