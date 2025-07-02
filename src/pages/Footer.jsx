import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="bg-dark text-white py-4 mt-auto shadow-lg">
            <Container>
                <Row className="align-items-center text-center">
                    <Col xs={12} md={4} className="mb-2 mb-md-0">
                        <span className="fw-bold">© 2025 - Grupo 24</span>
                    </Col>
                    <Col xs={12} md={4} className="mb-2 mb-md-0">
                        <small>Todos los derechos reservados.</small>
                    </Col>
                    <Col xs={12} md={4}>
                        <a
                            href="mailto:contacto@grupo24.com"
                            className="text-white text-decoration-none me-3"
                            title="Contacto"
                        >
                            Contacto
                        </a>
                        <a
                            href="https://github.com/GabrielCalisaya/TrabajoFinalGrupo24Comision2.git"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-decoration-none"
                            title="GitHub"
                        >
                            GitHub
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;