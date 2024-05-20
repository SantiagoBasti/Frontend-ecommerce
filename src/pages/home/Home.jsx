import { NavLink } from "react-router-dom"

export default function Home(){
    return(
        <>
        <h1>Home</h1>

        <div className="card">
            PRODUCTO 1
            <NavLink to="/product-detail/1">
                Ver más
            </NavLink>
        </div>
        <div className="card">
            PRODUCTO 2
            <NavLink to="/product-detail/2">j
                Ver más
            </NavLink>
        </div>
        <div className="card">
            PRODUCTO 3
            <NavLink to="/product-detail/3">
                Ver más
            </NavLink>
        </div>
        <div className="card">
            PRODUCTO 4
            <NavLink to="/product-detail/4">
                Ver más
            </NavLink>
        </div>


        </>
    );
}