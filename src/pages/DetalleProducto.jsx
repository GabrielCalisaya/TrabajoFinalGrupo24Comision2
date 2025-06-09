// Importación de hooks de React Router DOM para acceder a parámetros de URL y para la navegación
import { useParams, useNavigate } from 'react-router-dom';
// Importación de hooks de Redux para acceder al estado global y despachar acciones
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';
// Importación de las acciones para agregar y quitar productos de favoritos
import { agregarFavorito, quitarFavorito } from '../store/favoritosSlice';

import { FaHeart } from 'react-icons/fa';

function DetalleProducto() {
    // Obtiene el ID del producto de los parámetros de la URL
    const { id } = useParams();
    const dispatch = useDispatch(); // Inicializa useDispatch para despachar acciones
    const navigate = useNavigate(); // Inicializa useNavigate para la navegación programática

    // Obtiene la lista de todos los productos y los productos favoritos del estado global
    const productos = useSelector(state => state.products);
    const favoritos = useSelector(state => state.favoritos);

    // Busca el producto específico por su ID en la lista de productos
    const producto = productos.find(p => p.id === Number(id));
    // Verifica si el producto actual está marcado como favorito
    const esFavorito = favoritos.includes(Number(id));

    // Si el producto no se encuentra, muestra un mensaje
    if (!producto) {
        return <Container className="mt-5"><p>Producto no encontrado.</p></Container>;
    }

    // Función para alternar el estado de favorito de un producto
    const toggleFavorito = () => {
        if (esFavorito) {
            dispatch(quitarFavorito(producto.id)); // Si es favorito, lo quita
        } else {
            dispatch(agregarFavorito(producto.id)); // Si no es favorito, lo agrega
        }
    };

    // Función para navegar al formulario de edición del producto actual
    const handleEditarProducto = () => {
        navigate(`/formulario/${producto.id}`); // Redirige a la ruta de edición con el ID del producto
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
                            {/* Botón para navegar al formulario de edición del producto */}
                            <div className="d-grid gap-2">
                                <Button
                                    variant="info"
                                    className="mt-3"
                                    onClick={handleEditarProducto}
                                >
                                    Editar Producto
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DetalleProducto;