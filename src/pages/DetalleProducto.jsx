//importacion de hook para acceder a los parametros de la URL
import { useParams } from 'react-router-dom';

//importacion de hooks y funciones de Redux para accder al estado global
import { useSelector, useDispatch } from 'react-redux';

import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';

//importacion de las acciones para agregar y quitar favoritos
import { agregarFavorito, quitarFavorito } from '../store/favoritosSlice';
import { FaHeart } from 'react-icons/fa';

function DetalleProducto() {
  // Obtenemos el ID del producto desde los parámetros de la URL
  const { id } = useParams();
  const dispatch = useDispatch();

  // Obtenemos los productos y favoritos del estado global
  const productos = useSelector(state => state.products);
  const favoritos = useSelector(state => state.favoritos);

  // Buscamos el producto por su ID
  const producto = productos.find(p => p.id === Number(id));
  // Verificamos si el producto está en la lista de favoritos
  const esFavorito = favoritos.includes(Number(id));

  if (!producto) {
    return <Container className="mt-5"><p>Producto no encontrado.</p></Container>;
  }

  // Función para agregar o quitar el producto de favoritos
  const toggleFavorito = () => {
    if (esFavorito) {
      dispatch(quitarFavorito(producto.id));
    } else {
      dispatch(agregarFavorito(producto.id));
    }
  };

  return (
    <Container style={{ marginTop: '3rem', marginBottom: '3rem', minHeight: '70vh' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Img
              variant="top"
              src={producto.image || "https://via.placeholder.com/150"}
              alt={producto.title}
              style={{ height: '320px', objectFit: 'contain', background: '#f8f9fa' }}
              className="p-4"
            />
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <Card.Title className="mb-4 display-6">{producto.title}</Card.Title>
                <Button
                  variant="link"
                  onClick={toggleFavorito}
                  style={{ color: esFavorito ? 'red' : '#6c757d', fontSize: '2rem', textDecoration: 'none' }}
                  aria-label={esFavorito ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
                >
                  <FaHeart />
                </Button>
              </div>
              <Card.Text>
              <h5>
                <Badge bg="success" className="me-2">
                  ${producto.price?.toFixed(2)}
                </Badge>
                <Badge bg="info" className="text-dark me-2">
                  {producto.category}
                </Badge>
                <Badge bg={producto.rating?.count > 10 ? "primary" : producto.rating?.count > 0 ? "warning" : "danger"}>
                  {producto.rating?.count > 0
                    ? `${producto.rating?.count} disponibles`
                    : "Sin stock"}
                </Badge>
              </h5>
              <div>
                <strong>Descripción:</strong>
                <p className="mt-2 text-dark">{producto.description}</p>
              </div>
            </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleProducto;