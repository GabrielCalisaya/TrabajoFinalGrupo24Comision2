// Importamos los componentes de React Bootstrap que utilizaremos para la Navbar
import { Navbar, Container, Nav, Badge, Modal, Button } from 'react-bootstrap';
// Importacion necesaria para el Logout y la navegación
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
// logo para el logout
import { FiLogOut } from 'react-icons/fi';
import { useState } from 'react';
// Importamos NavLink para crear enlaces de navegacion internos que eviten la recarga de la pagina
import { NavLink } from 'react-router-dom';

function AppNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Obtenemos el usuario actual del estado global
    const user = useSelector(state => state.user);
    const [showConfirmarCierre, setShowConfirmarCierreModal] = useState(false);

    const handleShowConfirmarModal = (e) => {
        e.stopPropagation(); // Evita el clic en el detalle
        setShowConfirmarCierreModal(true);
    };
    const handleCloseConfirmarCierreModal = () => setShowConfirmarCierreModal(false);
// Función para manejar el logout del usuario
    const handleLogout = () => {
        dispatch(logout());
        handleCloseConfirmarCierreModal();
        navigate('/'); // Redirige al inicio de sesion
    };
    
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                {/* Navbar.Brand es logotipo de la app de nuestra barra de navegacion. El NavLink es para que al clickear, el usuario sea redirigido a la pagina principal */}
                <Navbar.Brand as={NavLink} to="/">
                    <img
                        src="/src/assets/Black White Minimalist Initials Monogram Jewelry Logo.png"
                        alt="Logo de la tienda"
                        style={{ maxWidth: '50px', height: 'auto', marginRight: '10px' }}
                    />
                    De Todo - Tu Tienda Online
                </Navbar.Brand>

                {/* Navbar.Toggle es el boton de "hamburguesa" que aparece en pantallas pequeñas para desplegar/ocultar el menu de navegacion. 'aria-controls="basic-navbar-nav"' enlaza este boton con el contenido que controla. */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Navbar.Collapse es el contenedor del contenido que se colapsa en pantallas pequeñas. 'id="basic-navbar-nav"' lo asocia con el Navbar.Toggle. */}
                <Navbar.Collapse>
                    {/* Nav de React Bootstrap es un contenedor para los enlaces de navegación. "me-auto" empuja los enlaces hacia la izquierda en pantallas grandes. */}
                    <Nav className="me-auto">
                        {/* NavLink de react-router-dom dentro de Nav.Link de React Bootstrap. '{NavLink}' le dice a Nav.Link que renderice a NavLink como su componente interno. 'end' asegura que la clase "active" se aplique solo cuando la ruta es exactamente "/". */}
                        <Nav.Link as={NavLink} to="/" end>
                            Inicio
                        </Nav.Link>

                        {/* NavLink para la pagina de "Favoritos" */}
                        {user.role ==='ADMIN' && (
                        <Nav.Link as={NavLink} to="/favoritos">
                            Favoritos
                        </Nav.Link>
                        )}
                        {user.role ==='USER' && (
                        <Nav.Link as={NavLink} to="/favoritos">
                            Favoritos
                        </Nav.Link>
                        )}
                        {/* NavLink para el formulario de añadir/editar productos */}
                        {user.role=== 'ADMIN' && (
                        <Nav.Link as={NavLink} to="/formulario">
                            Añadir Producto
                        </Nav.Link>
                        )}
                        {user.role ==='ADMIN' && (
                        <Nav.Link as={NavLink} to="/papelera">
                            Papelera
                        </Nav.Link>
                        )}
                        {/* NavLink para "Acerca De" */}
                        <Nav.Link as={NavLink} to="/acerca-de">
                            Acerca de
                        </Nav.Link>
                        </Nav>
                        {/* Boton de Logout con especificacion de sesion actual y rol */}
                    <Nav className="ms-auto align-items-center flex-column flex-lg-row">
                        <span className="mb-2 mb-lg-0 me-0 me-lg-3 d-flex align-items-center justify-content-center w-100 w-lg-auto">
                            <Badge
                                bg={user.role === 'ADMIN' ? 'danger' : 'secondary'}
                                className="px-3 py-2 text-uppercase"
                                style={{
                                    fontSize: '1em',
                                    letterSpacing: '1px',
                                    minWidth: '70px',
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}
                            >
                                {`${user.role} - ${user.nombre}`} {user.img && (<img src={user.img} alt={user.nombre} style={{ width: '30px', height: '30px', borderRadius: '50%', marginLeft: '10px' }} />)}
                            </Badge>
                        </span>
                        <button
                            className="btn btn-outline-light d-flex align-items-center justify-content-center w-100 w-lg-auto"
                            style={{ fontWeight: 'bold', gap: '0.5em', minWidth: 120 }}
                            onClick={handleShowConfirmarModal}
                        >
                            <FiLogOut size={20} />
                            <span className="d-none d-sm-inline">Cerrar sesión</span>
                            <span className="d-inline d-sm-none">Salir</span>
                        </button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            {/* Modal Cerrar Sesion */}
            <Modal show={showConfirmarCierre} onHide={handleCloseConfirmarCierreModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Cierre de sesion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estas seguro de que deseas cerrar sesion?.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmarCierreModal}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleLogout}>
                        Cerrar Sesion
                    </Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
        
    );
}
export default AppNavbar;