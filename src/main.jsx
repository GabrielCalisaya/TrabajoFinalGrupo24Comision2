import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './index.css';
// Acá importo el CSS de Bootstrap para que los estilos esten disponibles globalmente
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
