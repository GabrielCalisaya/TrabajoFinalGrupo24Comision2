function PaginaNoEncontrada() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      {/* Opcional: un enlace para volver a Inicio */}
      {/* <Link to="/">Volver a Inicio</Link> */}
    </div>
  );
}


export default PaginaNoEncontrada;