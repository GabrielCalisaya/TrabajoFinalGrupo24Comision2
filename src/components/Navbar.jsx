
//Importamos los componentes de React Bootstrap que utilizaremos para la Navbar
import { Navbar, Container, Nav} from 'react-bootstrap';
// Importamos NavLink para crear enlaces de navegacion internos que eviten la recarga de la página
import { NavLink } from 'react-router-dom';

function AppNavbar() {
    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>

                {/* Navbar.Brand es logotipo de la app de nuestra barra de navegación. El NavLink es para que al clickear, el usuario sea redirigido a la página prinicipal */}
                <Navbar.Brand as={NavLink} to="/">
                    App Grupo 24
                </Navbar.Brand>

                  {/*
                Navbar.Toggle es el botón de "hamburguesa" que aparece en pantallas pequeñas
                para desplegar/ocultar el menú de navegación.
                'aria-controls="basic-navbar-nav"' enlaza este botón con el contenido que controla.
                */}
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>

                {/* Navbar.Collapse es el contenedor del contenido que se colapsa en pantallas pequeñas.'id="basic-navbar-nav"' lo asocia con el Navbar.Toggle. */}
                <Navbar.Collapse>
                    {/* Nav de React Bootstrap es un contenedor para los enlaces de navegación. "me-auto" empuja los enlaces hacia la izquierda en pantallas grandes. */}
                    <Nav>
                        {/* NavLink de react-router-dom dentro de Nav.Link de React Bootstrap. '{NavLink}' le dice a Nav.Link que renderice a NavLink como su componente interno. 'end' asegura que la clase "active" se aplique solo cuando la ruta es exactamente "/". */}
                        <Nav.Link as={NavLink} to="/" end>
                            Inicio
                        </Nav.Link>

                        {/* NavLink para la página de "Favoritos" */}
                        <Nav.Link as={NavLink} to="/favoritos">
                            Favoritos
                        </Nav.Link>

                        {/* NavLink para el formulario de añadir/editar productos */}
                        <Nav.Link as={NavLink} to="/formulario">
                            Añadir Producto
                        </Nav.Link>

                        {/* NavLink para "Acerca De" */}
                        <Nav.Link as={NavLink} to="/acerca-de">
                            Acerca de
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;