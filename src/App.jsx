import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppRoutes from './components/AppRoutes.jsx';
import AppNavbar from './components/AppNavbar.jsx';
import Footer from './pages/Footer.jsx';

function App() {
  //Obitene el estado del usuario desde Redux
  const user = useSelector(state => state.user);
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        {user.isAuthenticated && <AppNavbar />}
        <main className="flex-grow-1">
          <AppRoutes />
        </main>
        {user.isAuthenticated && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;