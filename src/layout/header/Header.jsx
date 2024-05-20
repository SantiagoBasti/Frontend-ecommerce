import { NavLink } from "react-router-dom"
import "./Header.css"

export default function Header(){
    const isAdmin = true


    return <header>
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
    </header>
}