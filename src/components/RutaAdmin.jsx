import { useSelector } from "react-redux";
import AccesoDenegado from "../pages/AccesoDenegado";

const RutaAdmin = ({ children }) => {
  const { isAuthenticated, role } = useSelector(state => state.user);

  if (!isAuthenticated || role !== "ADMIN") {
    //muestrapagina de acceso denegado
    return <AccesoDenegado />;
  }

  return children;
};

export default RutaAdmin;