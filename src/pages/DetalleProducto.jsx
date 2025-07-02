import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { agregarFavorito, quitarFavorito } from '../store/favoritosSlice';
import { FaHeart, FaArrowLeft} from 'react-icons/fa';
import { useEffect, useCallback} from 'react';

function DetalleProducto() {
    // Obtiene el ID del producto de los parametros de la URL
    const { id } = useParams();
    const dispatch = useDispatch(); // Inicializa useDispatch para despachar acciones
    const navigate = useNavigate(); // Inicializa useNavigate para la navegación programática
    const user = useSelector(state => state.user);
    // Obtiene la lista de todos los productos y los productos favoritos del estado global
    const productos = useSelector(state => state.products);
    const favoritos = useSelector(state => state.favoritos[user.usuario] || []);

    // Busca el producto especifico por su ID en la lista de productos
    const producto = productos.find(p => p.id === Number(id));
    // Verifica si el producto actual está marcado como favorito
    const esFavorito = favoritos.includes(Number(id));

    useEffect(() => {
        if (!user.isAuthenticated) {
            navigate("/")
        }
    }, [user.isAuthenticated])
    // Si el producto no se encuentra, muestra un mensaje
    if (!producto) {
        return <Container className="mt-5"><p>Producto no encontrado.</p></Container>;
    }

    // Funcion para alternar el estado de favorito de un producto
    const toggleFavorito = useCallback((e) => {
        e.stopPropagation();
        if (esFavorito) {
            dispatch(quitarFavorito({ usuario: user.usuario, idProducto: producto.id }));
        } else {
            dispatch(agregarFavorito({ usuario: user.usuario, idProducto: producto.id }));
        }
    }, [dispatch, esFavorito, user.usuario, producto.id]);

    // Funcion para navegar al formulario de edición del producto actual
    const handleEditarProducto = () => {
        navigate(`/formulario/${producto.id}`); // Redirige a la ruta de edición con el ID del producto
    };

    return (
        <Container style={{ marginTop: '3rem', marginBottom: '3rem', minHeight: '70vh' }}>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="shadow-lg border-0 rounded-4">
                    <Button
                variant="light"
                onClick={() => navigate('/inicio')}
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 2,
                    borderRadius: '50%',
                    padding: '0.4rem 0.5rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                }}
                aria-label="Volver al inicio"
            >
                <FaArrowLeft size={18} />
            </Button>
                        <Card.Img
                            variant="top"
                            src={producto.image || "https://via.placeholder.com/150"}
                            alt={producto.title}
                            style={{ height: '320px', objectFit: 'contain', background: '#f8f9fa' }}
                            className="p-4"
                        />
                        <Card.Body>
                        {user.role !== "INVITADO" && (
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <Card.Title className="mb-4 display-6">{producto.title}</Card.Title>
                                    <Button
                                    variant="link"
                                    onClick={toggleFavorito}
                                    style={{ color: esFavorito ? 'red' : '#6c757d', fontSize: '2rem', textDecoration: 'none' }}
                                >
                                    <FaHeart />
                                </Button>
                            </div>
                        )}
                            {/*puse "as='div'" para que el texto no se vea como un parrafo */}
                            <Card.Text as="div">
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
                            {/* Boton para navegar al formulario de edicion del producto */}
                            {user.role == "ADMIN" && (
                                <div className="d-grid gap-2">
                                    <Button
                                        variant="info"
                                        className="mt-3"
                                        onClick={handleEditarProducto}
                                    >
                                        Editar Producto
                                    </Button>
                                </div>
                            )}  
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DetalleProducto;