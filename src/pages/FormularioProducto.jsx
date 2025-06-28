import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../store/productosSlice';
import { Container, Form, Button, Row, Col, Modal} from 'react-bootstrap';
import { useTraerProductos } from '../hooks/useTraerProductos';

function FormularioProducto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const products = useSelector(state => state.products);
    const [showCrearCambiarProductoModal, setShowCrearCambiarProductoModal] = useState(false);

    const handleShowCrearCambiarModal = (e) => {
        setShowCrearCambiarProductoModal(true);
    };
    const handleCloseCrearCambiarProductoModal = () => setShowCrearCambiarProductoModal(false);
    
    const {categorias} = useTraerProductos();

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating: {
        rate: 0,
        count: 0 // 'count' es el stock disponible
        }
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id) {
            const productToEdit = products.find(p => p.id === Number(id));
            if (productToEdit) {
                setFormData(productToEdit);
            } else {
                navigate('/');
            }
        }
    }, [id, products, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: undefined
        }));

        let newValue = value;

        if (name === 'price' || name === 'count' || name === 'rate') {
            newValue = value.replace(/^0+([1-9])/, '$1');
            if (newValue === '0') {
                newValue = 0;
            } else if (newValue === '') {
                newValue = 0;
            } else {
                newValue = Number(newValue);
            }
            if (isNaN(newValue)) {
                newValue = 0;
            }
        }

        setFormData(prevData => {
            if (name === 'count') {
                return {
                    ...prevData,
                    rating: {
                        ...prevData.rating,
                        count: newValue
                    }
                };
            } else if (name === 'rate') {
                return {
                    ...prevData,
                    rating: {
                        ...prevData.rating,
                        rate: newValue
                    }
                };
            } else {
                return {
                    ...prevData,
                    [name]: newValue
                };
            }
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'El nombre es obligatorio.';
        if (!formData.price || formData.price <= 0) newErrors.price = 'El precio debe ser un número positivo.';
        if (!formData.description.trim()) newErrors.description = 'La descripción es obligatoria.';
        if (!formData.category.trim()) newErrors.category = 'La categoría es obligatoria.';
        if (!formData.image.trim() || !/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(formData.image)) {
            newErrors.image = 'La URL de la imagen es obligatoria y debe ser una URL válida.';
        }
        if (typeof formData.rating.count !== 'number' || formData.rating.count < 0) {
            newErrors.count = 'El stock debe ser un número no negativo.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => { // Ya no necesita 'e' porque se llama desde el botón del modal
        // La validación ya se hizo antes de mostrar el modal
    
        setIsSubmitting(true); // Activa el estado de "enviando" justo antes del dispatch
    
        if (id) {
            dispatch(updateProduct({ ...formData, id: Number(id) }));
            navigate(`/detalle/${id}`);
        } else {
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            dispatch(addProduct({ ...formData, id: newId }));
            navigate(`/detalle/${newId}`);
        }
        setIsSubmitting(false); // Desactiva el estado de "enviando"
        handleCloseCrearCambiarProductoModal();
    };

    const formTitle = id ? 'Editar Producto' : 'Añadir Nuevo Producto';

    return (
        <Container className="mt-5 mb-5" style={{ minHeight: '70vh' }}>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={7}>
                    <h2 className="text-center mb-4">{formTitle}</h2>
                    <Form onSubmit={(e) => {
                        e.preventDefault(); // Previene el envío por defecto del formulario
                        if (validateForm()) { // Solo muestra el modal si el formulario es válido
                            handleShowCrearCambiarModal();
                        }
                    }} className="p-4 border rounded shadow-sm">
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Nombre del Producto</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Introduce el nombre del producto"
                                isInvalid={!!errors.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPrice">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Introduce el precio"
                                isInvalid={!!errors.price}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Introduce la descripción del producto"
                                rows={3}
                                isInvalid={!!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategory">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                isInvalid={!!errors.category}
                            >
                                <option value="">Selecciona una categoría</option>
                                {categorias.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.category}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formImage">
                            <Form.Label>URL de Imagen</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Introduce la URL de la imagen"
                                isInvalid={!!errors.image}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.image}
                            </Form.Control.Feedback>
                            {formData.image && !errors.image && (
                                <div className="mt-2 text-center">
                                    <img src={formData.image} alt="Imagen no reconocida" style={{ maxWidth: '100%', height: '150px', objectFit: 'contain', border: '1px solid #ddd', padding: '5px' }} />
                                </div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formStock">
                            <Form.Label>Stock Disponible</Form.Label>
                            <Form.Control
                                type="number"
                                name="count"
                                value={formData.rating.count}
                                onChange={handleChange}
                                placeholder="Introduce el stock disponible"
                                isInvalid={!!errors.count}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.count}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            variant="success"
                            type="submit"
                            className="w-100 mt-4"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Guardando...' : (id ? 'Guardar Cambios' : 'Añadir Producto')}
                        </Button>
                    </Form>
                </Col>
            </Row>
            {/* Modal Crear Nuevo */}
            <Modal show={showCrearCambiarProductoModal} onHide={handleCloseCrearCambiarProductoModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{id ? 'Confirmar Guardar Cambios' : 'Confirmar Añadir Producto'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {id ? '¿Estás seguro que deseas guardar estos cambios?' : '¿Estás seguro que deseas añadir este producto?'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCrearCambiarProductoModal}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? 'Guardando...' : (id ? 'Guardar Cambios' : 'Añadir Producto')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default FormularioProducto;