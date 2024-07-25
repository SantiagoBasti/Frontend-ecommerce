import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formatTimestampToInputDate } from "../../services/utils/formatDates";
import { useUser } from "../../context/UserContex";
import useApi from "../../services/interceptor/intercepor";



export default function AdminProduct() {

  const api = useApi()
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const { token } = useUser()
  const [ categories, setCategories ] = useState([])

  const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    getProduct();
    getCategories();
  }, []);

  async function getCategories(){
    try{

      const response = await api.get(`/categories`)

      const categoriesDB = response.data.categories

      setCategories(categoriesDB)

    }catch(error){
      console.log("Error al obtener categorias", error)
    }
  }

  async function getProduct() {
    try {
      const response = await api.get(`/products`);

      const { products } = response.data;

      //MOKAPI
      // { response: {data: { productos[]}}}
      // NODEJS
      //response: {data: (ok: boolean, message: string, products: porducts[])}

      setProducts(products);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  function onSubmit(data) {
    console.log(data);
  
    const formData = new FormData();
  
    formData.append("id", data.id);
    formData.append("name", data.name);
    formData.append("price", +data.price);
    formData.append("image", data.image.length ? data.image[0] : undefined);
    formData.append("createdAt", new Date(data.createdAt).getTime());
    formData.append("category", data.category);
    formData.append("description", data.description);
  
    if (data.id) {
      updateProductData(formData);
    } else {
      createProduct(formData);
    }
  }
  

 async function updateProductData(productFormData) {

    try {
      const id = productFormData.get('id');

      await api.put(`/products/${id}`, 
        productFormData, 
        {
          headers: {
            Authorization: token
          }
        });
      getProduct();
      setIsEditing(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  }
  
  async function createProduct(product) {
    try {
      const newProduct = 
      await api.post(`products`, product, {
        headers: {
          Authorization: token
        }
      });
  
      getProduct();
      console.log(newProduct)
      reset();
    } catch (error) {
      console.log(error);
    }
  }
  
  async function deleteProduct(id) {
    try {
      await api.delete(`/products/${id}`, 
        {
          headers:{
            Authorization: token
          }
      });

      getProduct();
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditProduct(producto) {

    setIsEditing(true);

    setValue("id", producto._id);
    setValue("name", producto.name);
    setValue("price", producto.price);
    // setValue("image", producto.image); Ya no lo podemos setear el input filr debido a que no podemos setear 
    setValue("category", producto.category._id);
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
            <input type="file" accept="image/*" {...register("image")} />
          </div>

          <div className="input-group">
            <label>Categoria</label>
            <select {...register("category")} className="select-input">
              {/* obtenido y actualizado el estado de categorias pinto con un map las diferentes opciones */}
              {
                categories.map(category => (
                  <option value={category._id} key={category._id}>
                    {category.viewValue}
                  </option>
                ))
              }

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
                  <img 
                  src={`http://localhost:3000/image/products/${product.image}`} alt={product.name} />
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
                  <button className="action-btn btn-danger" onClick={() => deleteProduct(product._id)}>
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