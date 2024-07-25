import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_SERVER_URL;

const userContext = createContext();

export const useUser = () => useContext(userContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    //localstorage
    JSON.parse(localStorage.getItem("user"))
  )

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token"))
    // localStorage.getItem("token")
  )

  const navigate = useNavigate()

  useEffect(() => {
    user ? localStorage.setItem("user", JSON.stringify(user)) : localStorage.removeItem("user") 
    
    token ? localStorage.setItem("token", JSON.stringify(token)) : localStorage.removeItem("token") 

  }, [user, token]);

  async function login(data) {
    try {

      const response = await axios.post(`${URL}/login`, data);

      setUser(response.data.user);
      setToken(response.data.token);

      Swal.fire({
        title: response.data.message,
        text: "El login se realizo correctamente, sera redirigido en un isntante",
        icon:"success",
        timer: 1500
      }).then(() =>{
        navigate("/")
        // window.location.href = "/"
      })

    } catch (error) {
      console.log(error);
      Swal.fire("Error", "No se pudo hacer el login", "error");
    }
  }

  function logout(){
    setUser()
    setToken()
    navigate("/")

  }

  return (
    <userContext.Provider value={{ user, token, login, logout}}>
      {children}
    </userContext.Provider>
  );
};
