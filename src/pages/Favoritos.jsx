import { useSelector } from 'react-redux';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import ProductoCarta from '../components/ProductosCarta';
import { useMemo } from 'react';

function Favoritos() {
  // Obtenemos el usuario actual, los favoritos globales y los productos
  const user = useSelector(state => state.user);
  const favoritosPorUsuario = useSelector(state => state.favoritos);
  const productos = useSelector(state => state.products);

  // Obtenemos la lista de favoritos del usuario actual, o array vacio si no hay
  const favoritos = favoritosPorUsuario[user.usuario] || [];

  // Filtramos los productos que están en la lista de favoritos del usuario
  const productosFavoritos = useMemo(
    () =>
      productos.filter(
        p => favoritos.includes(p.id) && p.estado !== 'inactivo'
      ),
    [productos, favoritos]
  );

  return (
    <Container style={{ marginTop: '3rem', marginBottom: '3rem', minHeight: '70vh' }}>
      <div className="d-flex align-items-center mb-4">
        <h2 className="mb-0 me-2">Favoritos</h2>
        <span className="badge bg-danger fs-6">{productosFavoritos.length}</span>
      </div>
      {productosFavoritos.length === 0 ? (
        <Alert variant="info" className="text-center">
          <strong>No tienes productos favoritos.</strong>
        </Alert>
      ) : (
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