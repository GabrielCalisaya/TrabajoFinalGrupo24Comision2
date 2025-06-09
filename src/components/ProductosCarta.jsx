// src/components/ProductosCarta.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { agregarFavorito, quitarFavorito } from '../store/favoritosSlice'; // Asegúrate de tener este slice
import { removeProduct } from '../store/productosSlice'; // Importa la acción para eliminar
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa'; // Iconos para favorito y eliminar

function ProductoCarta({ producto }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favoritos = useSelector(state => state.favoritos); // Obtiene IDs de favoritos

    const esFavorito = favoritos.includes(producto.id);

    const handleVerDetalles = () => {
        navigate(`/detalle/${producto.id}`);
    };

    const toggleFavorito = (e) => {
        e.stopPropagation(); // Evita que el clic en el botón de favorito active el detalle
        if (esFavorito) {
            dispatch(quitarFavorito(producto.id));
        } else {
            dispatch(agregarFavorito(producto.id));
        }
    };

    const handleEliminarProducto = (e) => {
        e.stopPropagation(); // Evita que el clic en el botón de eliminar active el detalle
        // Despacha la acción removeProduct con el ID del producto
        dispatch(removeProduct(producto.id));
        alert('Producto eliminadisimo.');
    };

    // No renderiza la tarjeta si el producto está en estado: false (borrado lógico)
    if (producto.estado === false) {
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
                    <Button variant="primary" onClick={handleVerDetalles}>
                        Ver detalles
                    </Button>
                    <Button
                        variant="link"
                        onClick={toggleFavorito}
                        style={{ color: esFavorito ? 'red' : 'gray', fontSize: '1.5rem' }}
                        aria-label={esFavorito ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
                    >
                        {esFavorito ? <FaHeart /> : <FaRegHeart />}
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleEliminarProducto}
                        style={{ fontSize: '1.2rem', padding: '0.5rem' }}
                        aria-label="Eliminar Producto"
                    >
                        <FaTrash />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductoCarta;