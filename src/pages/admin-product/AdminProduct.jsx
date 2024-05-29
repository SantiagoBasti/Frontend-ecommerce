import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formatTimestampToInputDate } from "../../services/utils/formatDates";

const URL = "https://663ebeffe3a7c3218a4b47e7.mockapi.io";

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    try {
      const response = await axios.get(`${URL}/products`);
      const productos = response.data;
      setProducts(productos);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmit(data) {
    data.createdAt = new Date(data.createdAt).getTime();
    data.price = +data.price;

    if (data.id) {
      await updateProductData(data);
    } else {
      await createProduct(data);
    }
    getProduct();
  }

  async function updateProductData(product) {
    try {
      await axios.put(`${URL}/products/${product.id}`, product);
      getProduct();
      setIsEditing(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  }

  async function createProduct(product) {
    try {
      await axios.post(`${URL}/products`, product);
      getProduct();
      reset();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`${URL}/products/${id}`);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditProduct(producto) {
    setIsEditing(true);

    setValue("id", producto.id);
    setValue("name", producto.name);
    setValue("price", producto.price);
    setValue("image", producto.image);
    setValue("category", producto.category);
    setValue("description", producto.description);
    setValue("createdAt", formatTimestampToInputDate(producto.createdAt));

  }

  return (
    <div className="admin-container">
      <h1>Admin Product</h1>
      <div className="admin-form-container">
        <form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("id")} />
          <div className="input-group">
            <label>Producto</label>
            <input
              type="text"
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 100,
              })}
            />
            {errors.name?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
            {(errors.name?.type === "minLength" || errors.name?.type === "maxLength") && (
              <span className="input-error">La cantidad de caracteres es invalida</span>
            )}
          </div>
          <div className="input-group">
            <label>Precio</label>
            <input type="number" {...register("price")} />
          </div>
          <div className="input-group">
            <label>Imagen</label>
            <input type="url" {...register("image")} />
          </div>
          <div className="input-group">
            <label>Categoria</label>
            <select {...register("category")}>
              <option value="running">Running</option>
              <option value="moda">Moda</option>
              <option value="sports">Deportes</option>
              <option value="mountain">Montaña</option>
            </select>
          </div>
          <div className="input-group">
            <label>Descripcion</label>
            <textarea {...register("description")} />
          </div>
          <div className="input-group">
            <label>Fecha ingreso</label>
            <input type="date" {...register("createdAt")} />
          </div>
          <button className={isEditing ? 'btn-success' : ''} type="submit">
            {isEditing ? 'Actualizar' : 'Crear'}
          </button>
        </form>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr className="admin-table-head">
              <th className="image">Imagen</th>
              <th className="name">Producto</th>
              <th className="description">Descripcion</th>
              <th className="price">Precio</th>
              <th className="actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="admin-table-row" key={product.id}>
                <td className="image">
                  <img src={product.image} alt={product.name} />
                </td>
                <td className="name">
                  <p>{product.name}</p>
                </td>
                <td className="description">
                  <p>{product.description}</p>
                </td>
                <td className="price">
                  <p>${product.price}</p>
                </td>
                <td className="actions">
                  <button className="action-btn" onClick={() => handleEditProduct(product)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="action-btn btn-danger" onClick={() => deleteProduct(product.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}