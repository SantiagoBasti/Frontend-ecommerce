import { NavLink } from "react-router-dom";
import "./Header.css";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext";
import { Modal } from "../modal/Modal";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleShow = () => {
    setIsOpen(true);
  };

  const isAdmin = true;
<<<<<<< HEAD

  const {toggleSidebarOrder, count} = useOrder()
=======
  const { toggleSidebarOrder } = useOrder();
>>>>>>> feature/order-localstorage

  return (
    <>
      <header>
        <nav className="header-nav">
          <NavLink to="/" className="nav-link">
            Principal
          </NavLink>
          <NavLink to="/login" className="nav-link" onClick={handleShow}>
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
          <FontAwesomeIcon icon={faCartShopping} onClick={toggleSidebarOrder} />
        </div>
      </header>

<<<<<<< HEAD
    <div className="user-info">
      <div className={`user-cart-container ${ count < 1 ? " " : "show-circle"}`} data-count={count}>
      <FontAwesomeIcon className="user-cart" icon={faCartShopping} onClick={() => toggleSidebarOrder()} />
      </div>
    </div>
    </header>
=======
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
>>>>>>> feature/order-localstorage
  );
}