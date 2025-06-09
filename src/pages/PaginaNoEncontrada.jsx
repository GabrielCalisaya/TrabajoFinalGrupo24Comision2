import { Link } from 'react-router-dom';

function PaginaNoEncontrada() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <p>Por favor, verifica la URL o vuelve a la página de inicio.</p>
      {/* Agregue un boton de redireccion al inicio */}
      <Link to="/">Volver a Inicio</Link>
    </div>
  );
}

export default PaginaNoEncontrada;