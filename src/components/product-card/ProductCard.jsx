import "./ProductCard.css";

export default function ProductCard({ product }) {
    return (
        <article className="card-container">
            <figure>
                <img src="" alt="" />
                <div className="actions">
                    <i className="fa-regular fa-heart"></i>
                    <i className="fa-regular fa-eye"></i>
                </div>
            </figure>
            <div className="info-product">
                <h2>AirPods Pro2</h2>
                <p className="price">1,099,000 <small>COP</small></p>
                <div className="card-selection">
                    <div className="version">
                        <label className="selection-label" htmlFor="version">Versión</label>
                        <select name="version" id="version">
                            <option value="white">AirPods Pro 2</option>
                        </select>
                    </div>
                </div>
                <div className="star">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    (5)
                </div>
                <button>Añadir al carrito</button>
            </div>
        </article>
    );
}