import { useEffect, useState } from "react";
import { useContext, createContext } from "react";
import Swal from "sweetalert2";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  // estado de la orden
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem("order"))  || []
  );

  const [sidebarToggle, setsidebarToggle] = useState(false)

  useEffect(() =>{

    localStorage.setItem("order", JSON.stringify(order))
    calculateTotal();
  }, [order])

  const [total, setTotal] = useState(0);
  // estado de desplegar o no el sidebar
  // estados total

  // function agregar producto
  function addOrderItem(producto) {
    // Buscar en la orden si existe el producto
    const product = order.find((prod) => prod.id === producto.id);
  
    if (product) {
      // Si existe, añadir 1 a la cantidad
      handleChangeQuantity(product.id, product.quantity + 1);
    } else {
      // Si no existe, añadir el producto al array con cantidad 1
      producto.quantity = 1;

      setOrder([...order, producto]);
      // localStorage.setItem("order", JSON.stringify([...order, producto]))
      
    }
  }

  // calcularTotal
  function calculateTotal() {
    let totalCount = 0;

    order.forEach((prod) => {
      totalCount += prod.price * prod.quantity;
    });

    setTotal(totalCount);
  }
  // remover elemento de la carta


  //Funcion para manejar cambios de cantidad
  function handleChangeQuantity(id, quantity){
    
    //Buscar su producto por su id
    //Cambiar la cantidad
    //Actualizar estado orders
    const updateOrder = order.map(item => {

      if(item.id === id){
        item.quantity = quantity;
      }
      return item
    });
    // localStorage.setItem("order", JSON.stringify(updateOrder))
    setOrder(updateOrder)

  }

  //Funcion para quitar elemento de mi order
  function removeItem(id){

    Swal.fire({
      title:"Borar Archivo",
      text:"Realmente desea quitar este producto",
      icon:"error",
      showConfirmButton: true,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText:"Borrar",
      confirmButtonColor: "red",
    }).then(result => {
      if(result.isConfirmed){
        const updOrder = order.filter(prod => prod.id !== id);
        // localStorage.setItem("order", JSON.stringify(updOrder))
        setOrder(updOrder)
      }
    })
  }

    // toggleSidebar
  function toggleSidebarOrder(){
    setsidebarToggle(!sidebarToggle)

  }



  return (
    <OrderContext.Provider value={{ order, total, sidebarToggle, addOrderItem, handleChangeQuantity, removeItem, toggleSidebarOrder }}>
      {children}
    </OrderContext.Provider>
  );
};