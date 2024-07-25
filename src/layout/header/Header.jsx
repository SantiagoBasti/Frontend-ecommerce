import { NavLink } from "react-router-dom";
import "./Header.css";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext";
import { Modal } from "../modal/Modal";
import { useState } from "react";
import { useUser } from "../../context/UserContex";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleShow = () => {
    setIsOpen(true);
  }

  const { user, logout } = useUser()
  
  const { toggleSidebarOrder } = useOrder();

  return (
    <>
      <header>
        <nav className="header-nav">
          <NavLink to="/" className="nav-link">
            Principal
          </NavLink>

          {user ? <button className="nav-link" onClick={logout}>logout</button>
          : <NavLink to="/login" className="nav-link">
            Login
            </NavLink>
          }

          <NavLink to="/contact" className="nav-link">
            Contacto
          </NavLink>
          <NavLink to="/about-us" className="nav-link">
            Acerca de
          </NavLink>
          <NavLink to="/register" className="nav-link">
            Registro
          </NavLink>

          {user?.role === 'ADMIN_ROLE' && (
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
          <FontAwesomeIcon icon={faCartShopping} onClick={toggleSidebarOrder} />
        </div>
      </header>

      <Modal title="Ingresar" isOpen={isOpen} handleClose={handleClose}>
        <>
          <h3>Elemento Children</h3>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, sunt ipsam! Excepturi ut doloribus rem nemo sapiente laboriosam omnis error, nobis dolorem minus incidunt, recusandae facere nihil? Possimus, laboriosam veritatis?
          </p>
          <h3>Otro titulo</h3>
        </>
      </Modal>
    </>
  );
}