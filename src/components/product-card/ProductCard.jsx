import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeDecimals } from "../../services/utils/FormatNumber";

import "./ProductCard.css";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";

import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";
import { Link } from "react-router-dom";


export default function ProductCard({ product }) {

  const { addOrderItem } = useOrder();


  return (
    <article className="product-card">
      <div className="card-header">
        <div className="product-image">
          <img src={product.image} alt={product.name} />

          <button className="btn-quickview">vista rápida</button>
        </div>
      </div>
      <div className="card-body">
        <div className="product-info">
          <div className="product-category">{product.category}</div>

          <div className="product-review">
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>

        <div className="product-name">
          <a href="#"> {product.name}</a>
        </div>
        <div className="product-price">
          <div className="product-discount-price">
            $ {removeDecimals(product.price * 0.9)}
          </div>
          <div className="product-normal-price">
            $ {removeDecimals(product.price)}
          </div>
        </div>
      </div>
      <div className="card-footer">
        <button className="btn-icon" onClick={() => addOrderItem(product)}>Añadir</button>

    {/* Boton ver mas */}
        <Link className="btn-icon" to={`/product-detail/${product.id}`}>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} title="Ver Detalle"/>
        </Link>

        <button className="btn-icon">
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </article>
  );
}