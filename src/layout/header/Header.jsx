import { NavLink } from "react-router-dom";
import "./Header.css";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext";

export default function Header() {
  const isAdmin = true;
  const {toggleSidebarOrder} = useOrder()

  return (
    <header>
      <nav className="header-nav">
        <NavLink to="/" className="nav-link">
          Principal
        </NavLink>
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
        <NavLink to="/contact" className="nav-link">
          Contacto
        </NavLink>
        <NavLink to="/about-us" className="nav-link">
          Acerca de
        </NavLink>
        <NavLink to="/register" className="nav-link">
          Registro
        </NavLink>
        {isAdmin && (
          <>
            <NavLink to="/admin-product" className="nav-link">
              Admin Product
            </NavLink>
            <NavLink to="/admin-user" className="nav-link">
              Admin User
            </NavLink>
          </>
        )}
      </nav>

      <div className="user-info">
      <FontAwesomeIcon icon={faCartShopping} onClick={() => toggleSidebarOrder()} />
      </div>
    </header>
  );
}