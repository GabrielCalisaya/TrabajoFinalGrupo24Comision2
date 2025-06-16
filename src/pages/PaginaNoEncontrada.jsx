import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

function PaginaNoEncontrada() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg border-0 text-center p-4">
            <Card.Body>
              <FaExclamationTriangle size={60} className="text-warning mb-3" />
              <Card.Title as="h1" className="mb-3 text-danger fw-bold">404</Card.Title>
              <Card.Subtitle as="h2" className="mb-3 text-dark">Página no encontrada</Card.Subtitle>
              <Card.Text className="mb-4">
                Lo sentimos, la página que buscas no existe.<br />
                Por favor, verifica la URL o vuelve a la página de inicio.
              </Card.Text>
              <Button as={Link} to="/inicio" variant="primary" size="lg">
                Volver al Inicio
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PaginaNoEncontrada;