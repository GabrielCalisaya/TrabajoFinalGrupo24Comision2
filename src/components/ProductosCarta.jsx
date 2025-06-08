// 1. Se importó el ícono FaHeart de 'react-icons/fa' para mostrar el corazón en el botón de favoritos.
// 2. Se agregó el uso de useDispatch y useSelector de react-redux para manejar el estado global de favoritos.
// 3. Se implementó la lógica toggleFavorito para agregar o quitar productos de favoritos usando Redux.
// 4. se Importo las acciones de Redux para agregar y quitar productos de favoritos

import { Card, Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { agregarFavorito, quitarFavorito } from '../store/favoritosSlice';
import { FaHeart } from 'react-icons/fa';

function ProductoCarta({ producto }) {
  const dispatch = useDispatch();
  const favoritos = useSelector(state => state.favoritos);
  const esFavorito = favoritos.includes(producto.id);

  const toggleFavorito = () => {
    if (esFavorito) {
      dispatch(quitarFavorito(producto.id));
    } else {
      dispatch(agregarFavorito(producto.id));
    }
  };

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

          {/* Botón para agregar o quitar de favoritos */}
          <Button
            variant="link"
            onClick={toggleFavorito}
            style={{ color: esFavorito ? 'red' : '#6c757d', fontSize: '1.8rem', textDecoration: 'none' }}
            aria-label={esFavorito ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
          >
            <FaHeart />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductoCarta;