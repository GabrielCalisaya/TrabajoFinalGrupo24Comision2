import { Container, Row, Col, Card } from 'react-bootstrap';

function AcercaDe() {
  const miembros = [
    {
      nombre: 'Gabriel Calisaya',
      rol: 'Encargado de la validación del formulario y correcciones en general.',
      
    },
    {
      nombre: 'Juan Carrizo',
      rol: 'Encargado de las rutas dinámicas.',
      
    },
    {
      nombre: 'Natali Suarez',
      rol: 'Consumo de la API. Uso de React-Redux.', 
      
    },
    {
      nombre: 'Fernando Romero',
      rol: 'Encargado del desarrollo de la sección "Favoritos" y "Detalles" en productos.',
      
    },
    {
      nombre: 'Juan Baca Wayar',
      rol: 'Encargado del funcionamiento del Formulario con el manejo de rutas dinámicas.',
      
    },
  ];

  return (
    <section id="about-us" className="py-5">
      <Container className="text-center">
        <h2 className="mb-4 text-primary">Acerca de Nosotros</h2>
        <p className="lead mb-4">
          ¡Hola! Somos el Grupo 24 y hemos realizado el Trabajo Final de Programación Visual. Nos encanta seguir aprendiendo sobre estas nuevas tecnologías
        </p>
      

        <h3 className="mb-4 text-primary">Nuestro Equipo</h3>
        <Row className="justify-content-center g-4">
          {miembros.map((member, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}> 
              <Card className="h-100 shadow-sm">
      
                <Card.Body>
                  <Card.Title className="text-dark">{member.nombre}</Card.Title> 
                  <Card.Text className="text-muted">
                    {member.rol} 
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <h3 className="mt-5 mb-4 text-primary">Trabajo Realizado</h3>
        <p className="lead mb-5">
          Hemos desarrollado una Tienda Online mediante el uso de tecnologías modernas como lo son React, React-Bootstrap, React-Redux y el consumo de una API.
        </p>

        <p className="text-muted fst-italic">
          ¡Gracias por visitar nuestra página!
        </p>
      </Container>
    </section>
  );
}

export default AcercaDe;