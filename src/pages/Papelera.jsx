import { useSelector } from 'react-redux';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import ProductoCarta from '../components/ProductosCarta';

function Papelera() {
  const products = useSelector(state => state.products);
  const productosEnPapelera = products.filter(product => product.estado === 'inactivo');

  return (
    <Container style={{ marginTop: '3rem', marginBottom: '3rem', minHeight: '70vh' }}>
      <div className="d-flex align-items-center mb-4">
        <h2 className="mb-0 me-2">Papelera</h2>
        <span className="badge bg-secondary fs-6">{productosEnPapelera.length}</span>
      </div>
      {productosEnPapelera.length === 0 ? (
        <Alert variant="info" className="text-center">
          <strong>No hay productos en la papelera.</strong>
        </Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {productosEnPapelera.map(producto => (
            <Col key={producto.id}>
                {/* renderizamos los productos en papelera */}
              <ProductoCarta producto={producto} papelera={true} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Papelera;