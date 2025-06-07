import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './index.css';
// Acá importo el CSS de Bootstrap para que los estilos esten disponibles globalmente
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
