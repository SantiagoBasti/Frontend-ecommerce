
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext";
import "./OrderSidebar.css";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function OrderSidebar() {
  const { order, total, handleChangeQuantity, removeItem, sidebarToggle } = useOrder();

  return (
    <div className={`order-wrapper ${sidebarToggle ? 'active' : ""}`}>
      <div className="list-container">
        <h2>Orden actual:</h2>
        <ul className="order-list">
          {order.map((product) => {
            return (
              <li className="order-item" key={product.id}>
                <img
                  className="order-image"
                  src="https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                  alt=""
                />
              <div className="order-item-name" title={product.name}>
                {product.name}
              </div>

              <div className="order-quantity">

              <input type="numbre" className="order-quantity-input" value={product.quantity} onChange={(evt) => handleChangeQuantity(product.id, evt.target.value)} min={1}/>

              <div className="order-price">${product.price}</div>
              <div className="order-subtotal">${product.price * product.quantity}</div>
              <div className="order-actions">
              <FontAwesomeIcon icon={faTrashCan} title="Eliminar Producto" onClick={() => removeItem(product.id)}/>
              </div>

        
                  </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="order-finish">
        <div className="total">
          <div className="total-count">Items: 20</div>
          <div className="total-price">
            Total $ <span>{total}</span>
          </div>
        </div>
        <div className="order-purchase">
          {/* <a onClick={() => clearCart()}>Limpiar carrito</a>
					<button className="btn" onClick={() => finishOrder()}>
						Comprar
					</button> */}
        </div>
      </div>
    </div>
  );
}