import { useState } from "react";
import ProductCard from "../product-card/ProductCard";
import { useEffect } from "react";
import axios from "axios";
import "./ProductList.css";

const URL = "https://663ebeffe3a7c3218a4b47e7.mockapi.io";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  // Generar un estado para nuestros productos []
  // UseEffect hacer una petición controlada
  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await axios.get(`${URL}/products`);

      const productsAPI = response.data;

      console.log(productsAPI);

      setProducts(productsAPI);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>LISTA DE PRODUCTOS</h2>

      <div className="product-card-container">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}

        {/* //Pegar lo de paginacion en admin product debajo de la tabla de productos minuto 32 hasta el minuto 1:05 class 5/07/2024 */}

      </div>
    </div>
  );
}