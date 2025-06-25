import { Container, Card, Carousel, Badge } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';
import participantes from '../data/participantes.json';

function AcercaDe() {
  return (
    <section id="about-us" className="py-5">
      <Container className="text-center">
        <h2 className="mb-4 text-primary">Acerca de Nosotros</h2>
        <Card className="mt-4 shadow">
          <Card.Body>
            <Card.Title as="h5" className="text fw-bold mb-3 text-center">
              ¡Hola! Somos el Grupo 24 y hemos realizado el Trabajo Final de Programación Visual. Nos encanta seguir aprendiendo sobre estas nuevas tecnologías
            </Card.Title>
          </Card.Body>
        </Card>
        <br />


        <h3 className="mb-4 text-primary">Nuestro Equipo</h3>
        <Card className="shadow mb-4" style={{ background: "#f8f9fa", borderRadius: "1rem" }}>
          <Card.Body>
            <div style={{ position: "relative" }}>
              <Carousel
                interval={3500}
                indicators={false}
                pause={false}
                fade
                className="mb-2 carousel-black-arrows"
                style={{
                  width: "100%",
                  margin: "0 auto",
                  background: "#f8f9fa",
                  borderRadius: "1rem",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
                }}
              >
                {participantes.map((participantes) => (
                  <Carousel.Item key={participantes.github}>
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={participantes.img}
                        alt={participantes.nombre}
                        className="rounded-circle mb-3"
                        style={{
                          width: 120,
                          height: 120,
                          objectFit: "cover",
                          border: "4px solid #0d6efd",
                        }}
                      />
                      <h5 className="mb-1">{participantes.nombre}</h5>
                      <a
                        href={participantes.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-2"
                        style={{ textDecoration: "none" }}
                      >
                        <Badge bg="dark" className="d-flex align-items-center gap-1">
                          <FaGithub style={{ fontSize: "1.1em" }} />
                          {participantes.github}
                        </Badge>
                      </a>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Card.Body>
        </Card>

        <h3 className="mt-5 mb-4 text-primary">Trabajo Realizado</h3>
        <Card className="mt-4 shadow">
          <Card.Body>
            <Card.Title as="h5" className="fw-bold mb-3 text-center">
              <span className="text-primary">Sobre el Proyecto</span>
            </Card.Title>
            <Card.Text className="text-center">
              Esta Tienda Online es el resultado del Trabajo Final de Programación Visual, desarrollada por el Grupo 24.<br /><br />
              El proyecto implementa una gestión completa de productos, favoritos y usuarios, con autenticación y roles (<strong>ADMIN</strong> y <strong>USER</strong>), todo manejado mediante <strong>React</strong>, <strong>Redux Toolkit</strong> y <strong>Redux Persist</strong>.<br /><br />
              Se utilizan <strong>rutas protegidas</strong> y <strong>rutas dinámicas</strong> gracias a <strong>React-Router-Dom</strong>, permitiendo navegación segura y la visualización de detalles individuales de productos y otras páginas de forma eficiente y moderna.<br /><br />
              Los usuarios pueden navegar y buscar productos, gestionarlos (si son administradores), marcar favoritos, y disfrutar de una experiencia visual y segura gracias a <strong>React-Bootstrap</strong> y <strong>React-Icons</strong>.<br /><br />
              Además, la aplicación cuenta con validaciones de formulario, manejo de sesión persistente y una interfaz amigable y adaptable a cualquier dispositivo.
              <br /><br />
              <span className="text-success">¡Gracias por visitar nuestra tienda y confiar en nuestro trabajo!</span>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mt-4 shadow">
          <Card.Body>
            <Card.Title as="h1" className="text-info fw-bold mb-3 text-center">
              <strong>¡Gracias por visitar nuestro proyecto!</strong>
            </Card.Title>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default AcercaDe;