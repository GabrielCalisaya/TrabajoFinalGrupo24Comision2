// src/pages/Inicio.jsx

import { useSelector } from "react-redux";
import ProductoCarta from "../components/ProductosCarta";
import { useTraerProductos } from "../hooks/useTraerProductos";
import { SpinnerLoad } from "../components/SpinnerLoad";
import { Button, Container, Row, Col } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';
import { selectActiveProducts } from '../store/productosSlice';

function Inicio() {
    const { loading, error } = useTraerProductos();
    const products = useSelector(selectActiveProducts);

    const navigate = useNavigate();

    const handleCrearProducto = () => {
        navigate('/formulario');
    };

    if (error) {
        // Muestra un mensaje de error si falla la carga de productos
        return <Container className="mt-5"><p className="text-danger text-center">Error al cargar los productos.</p></Container>;
    }

    return (
        <Container className="mt-4 mb-5">
            <h2 className="text-center mb-4">Página de Inicio de Productos</h2>
            <p className="text-center mb-4">Aquí se listarán todas las tarjetas de productos.</p>

            <Row className="justify-content-center mb-5">
                <Col xs={12} md={6} lg={4} className="text-center">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleCrearProducto}
                        className="w-75"
                    >
                        Crear Nuevo Producto
                    </Button>
                </Col>
            </Row>

            {loading ? (
                // Muestra el spinner mientras los productos están cargando
                <SpinnerLoad open={loading} />
            ) : (
                // Si no hay productos y no está cargando, muestra un mensaje
                products.length === 0 ? (
                    <p className="text-center">No hay productos activos para mostrar.</p>
                ) : (
                    // Muestra el grid de productos
                    <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
                        {products.map((producto) => (
                            <Col key={producto.id} className="d-flex justify-content-center">
                                <ProductoCarta producto={producto} />
                            </Col>
                        ))}
                    </Row>
                )
            )}
        </Container>
    );
}

export default Inicio;