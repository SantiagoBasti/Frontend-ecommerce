import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContex";

export default function AdminGuard({ children }) {
  const { user } = useUser(); // Asegúrate de invocar useUser() correctamente

  // Utilizando if-else para determinar la salida
  if (user && user.role === "ADMIN_ROLE") {
    return children; // Permite el acceso al contenido protegido
  } else {
    return <Navigate to="/" replace />; // Redirige a la página principal si no es administrador
  }
}