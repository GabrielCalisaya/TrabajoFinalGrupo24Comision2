import { useState } from 'react';
import { Card, Button, Modal} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { agregarFavorito, quitarFavorito } from '../store/favoritosSlice';
import { removeProduct, restoreProduct} from '../store/productosSlice'; // Importa la acción para eliminar
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa'; // Iconos para favorito y eliminar

function ProductoCarta({ producto, papelera }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const favoritosPorUsuario = useSelector(state => state.favoritos);
    const esFavorito = (favoritosPorUsuario[user.usuario] || []).includes(producto.id);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleVerDetalles = () => {
        navigate(`/detalle/${producto.id} `);
    };

    const toggleFavorito = (e) => {
        e.stopPropagation(); // Evita que el clic en el botón de favorito active el detalle
        if (esFavorito) {
            dispatch(quitarFavorito({ usuario: user.usuario, idProducto:producto.id }));
          } else {
            dispatch(agregarFavorito({ usuario: user.usuario, idProducto:producto.id }));
          }
        };
    const handleShowDeleteModal = (e) => {
        e.stopPropagation(); // Evita el clic en el detalle
        setShowDeleteModal(true);
    };

    // Función para cerrar el modal de confirmación
    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    // Funcion que se ejecuta cuando el usuario confirma la eliminacion
    const handleConfirmDelete = () => {
        dispatch(removeProduct({ id: producto.id }));
        handleCloseDeleteModal(); // Cierra el modal después de despachar la acción
        alert('Producto eliminado correctamente.'); 
    };
    const handleRestaurar = () => {
        dispatch(restoreProduct({ id: producto.id }));
        alert('Producto restaurado correctamente.');
    }
    if (producto.estado === 'inactivo' && !papelera) {
        return null;
    }

    return (
        <Card style={{ width: '18rem', margin: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
            <Card.Img
                variant="top"
                src={producto.image}
                alt={producto.title}
                style={{ height: '200px', objectFit: 'contain', padding: '15px', background: '#f8f9fa', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
            />
            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Card.Title className="mb-2" style={{ fontSize: '1.2rem', minHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {producto.title}
                </Card.Title>
                <Card.Text className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>
                    Categoría: {producto.category}
                </Card.Text>
                <Card.Text className="mb-2" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    Precio: ${producto.price?.toFixed(2)}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                {producto.estado !== 'inactivo' && user.role !== "INVITADO" &&(
                    <Button variant="primary" onClick={handleVerDetalles}>
                        Ver detalles
                    </Button>
                )}
                    {/*Si el producto esta activo y rol no es invitado, mostrar agregar a favoritos */}
                    {producto.estado !== 'inactivo' && user.role !== "INVITADO" && (
                    <Button
                        variant="link"
                        onClick={toggleFavorito}
                        style={{ color: esFavorito ? 'red' : 'gray', fontSize: '1.5rem' }}
                        aria-label={esFavorito ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
                    >
                        {esFavorito ? <FaHeart /> : <FaRegHeart />}
                    </Button>
                    )}
                    {producto.estado !== 'inactivo' && user.role == "ADMIN" && (
                        <Button
                            variant="danger"
                            onClick={handleShowDeleteModal}
                            style={{ fontSize: '1.2rem', padding: '0.5rem' }}
                            aria-label="Eliminar Producto"
                        >
                            <FaTrash />
                        </Button>
                    )}
                {producto.estado === 'inactivo' && papelera && (
                    <Button variant ="success"
                            onClick={handleRestaurar}
                            style={{ fontSize: '1rem', padding: '0.5rem' }}
                            aria-label='Restaurar Producto'>Restaurar</Button>
                    )}
                </div>
            </Card.Body>
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estas seguro de que deseas deshabilitar el producto **"{producto.title}"**?.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}

export default ProductoCarta;