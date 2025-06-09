import { useSelector } from 'react-redux';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import ProductoCarta from '../components/ProductosCarta';

function Favoritos() {
  // Obtenemos los favoritos y productos del estado global
  const favoritos = useSelector(state => state.favoritos);
  const productos = useSelector(state => state.products);

  // Filtramos los productos que están en la lista de favoritos
  const productosFavoritos = productos.filter(p => favoritos.includes(p.id));

  return (
    <Container style={{ marginTop: '3rem', marginBottom: '3rem', minHeight: '70vh' }}>
      <div className="d-flex align-items-center mb-4">
        <h2 className="mb-0 me-2">Favoritos</h2>
        <span className="badge bg-danger fs-6">{productosFavoritos.length}</span>
      </div>
      {productosFavoritos.length === 0 ? (
        // Si no hay productos favoritos, mostramos un mensaje
        <Alert variant="info" className="text-center">
          <strong>No tienes productos favoritos.</strong>
        </Alert>
      ) : (
        // Si hay productos favoritos, los mostramos en una cuadrícula
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {productosFavoritos.map(producto => (
            <Col key={producto.id}>
              <ProductoCarta producto={producto} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Favoritos;