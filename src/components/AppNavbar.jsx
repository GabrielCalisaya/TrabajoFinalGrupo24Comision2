// Importamos los componentes de React Bootstrap que utilizaremos para la Navbar
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
// Importacion necesaria para el Logout y la navegación
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';

// logo para el logout
import { FiLogOut } from 'react-icons/fi';

// Importamos NavLink para crear enlaces de navegación internos que eviten la recarga de la página
import { NavLink } from 'react-router-dom';

function AppNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Obtenemos el usuario actual del estado global
    const user = useSelector(state => state.user);

// Función para manejar el logout del usuario
    const handleLogout = () => {
        dispatch(logout());
        navigate('/'); // Redirige al inicio de sesión
    };
    
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                {/* Navbar.Brand es logotipo de la app de nuestra barra de navegación. El NavLink es para que al clickear, el usuario sea redirigido a la página principal */}
                <Navbar.Brand as={NavLink} to="/">
                    <img
                        src="/src/assets/Black White Minimalist Initials Monogram Jewelry Logo.png"
                        alt="Logo de la tienda"
                        style={{ maxWidth: '50px', height: 'auto', marginRight: '10px' }}
                    />
                    De Todo - Tu Tienda Online
                </Navbar.Brand>

                {/* Navbar.Toggle es el botón de "hamburguesa" que aparece en pantallas pequeñas para desplegar/ocultar el menú de navegación. 'aria-controls="basic-navbar-nav"' enlaza este botón con el contenido que controla. */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Navbar.Collapse es el contenedor del contenido que se colapsa en pantallas pequeñas. 'id="basic-navbar-nav"' lo asocia con el Navbar.Toggle. */}
                <Navbar.Collapse>
                    {/* Nav de React Bootstrap es un contenedor para los enlaces de navegación. "me-auto" empuja los enlaces hacia la izquierda en pantallas grandes. */}
                    <Nav className="me-auto">
                        {/* NavLink de react-router-dom dentro de Nav.Link de React Bootstrap. '{NavLink}' le dice a Nav.Link que renderice a NavLink como su componente interno. 'end' asegura que la clase "active" se aplique solo cuando la ruta es exactamente "/". */}
                        <Nav.Link as={NavLink} to="/" end>
                            Inicio
                        </Nav.Link>

                        {/* NavLink para la página de "Favoritos" */}
                        <Nav.Link as={NavLink} to="/favoritos">
                            Favoritos
                        </Nav.Link>

                        {/* NavLink para el formulario de añadir/editar productos */}
                        {user.role=== 'ADMIN' && (
                        <Nav.Link as={NavLink} to="/formulario">
                            Añadir Producto
                        </Nav.Link>
                        )}
                        {/* NavLink para "Acerca De" */}
                        <Nav.Link as={NavLink} to="/acerca-de">
                            Acerca de
                        </Nav.Link>
                        </Nav>
                        {/* Botón de Logout con especificacion de sesion actual y rol */}
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
                                {user.role}
                            </Badge>
                        </span>
                        <button
                            className="btn btn-outline-light d-flex align-items-center justify-content-center w-100 w-lg-auto"
                            style={{ fontWeight: 'bold', gap: '0.5em', minWidth: 120 }}
                            onClick={handleLogout}
                        >
                            <FiLogOut size={20} />
                            <span className="d-none d-sm-inline">Cerrar sesión</span>
                            <span className="d-inline d-sm-none">Salir</span>
                        </button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

// Falta terminar de estilizar el navbar
export default AppNavbar;