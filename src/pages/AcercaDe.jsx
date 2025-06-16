import { Container, Card, Carousel, Badge } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';

function AcercaDe() {
  const participantes = [
    {
      nombre: "Calisaya Gabriel",
      github: "GabrielCalisaya",
      url: "https://github.com/GabrielCalisaya",
      img: "https://github.com/GabrielCalisaya.png",
    },
    {
      nombre: "Juan Carrizo",
      github: "JuanCarrizo9",
      url: "https://github.com/JuanCarrizo9",
      img: "https://github.com/JuanCarrizo9.png",
    },
    {
      nombre: "Juan Sebastian",
      github: "Juansebaca",
      url: "https://github.com/Juansebaca",
      img: "https://github.com/Juansebaca.png",
    },
    {
      nombre: "Natali Suarez",
      github: "natalicmk",
      url: "https://github.com/natalicmk",
      img: "https://github.com/natalicmk.png",
    },
    {
      nombre: "Fernando Romero",
      github: "Android",
      url: "https://github.com/TuAndroide",
      img: "https://github.com/TuAndroide.png",
    },
  ];

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
                {participantes.map((p) => (
                  <Carousel.Item key={p.github}>
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={p.img}
                        alt={p.nombre}
                        className="rounded-circle mb-3"
                        style={{
                          width: 120,
                          height: 120,
                          objectFit: "cover",
                          border: "4px solid #0d6efd",
                        }}
                      />
                      <h5 className="mb-1">{p.nombre}</h5>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-2"
                        style={{ textDecoration: "none" }}
                      >
                        <Badge bg="dark" className="d-flex align-items-center gap-1">
                          <FaGithub style={{ fontSize: "1.1em" }} />
                          {p.github}
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