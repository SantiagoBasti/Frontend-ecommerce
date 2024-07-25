import axios from "axios"

import { useEffect } from "react";
import Swal from "sweetalert2";
import { useUser } from "../../context/UserContex";
 "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
});

const useApi = () => {
    const {token, logout} = useUser ()

    useEffect(() => {
       const requestInterceptor =  api.interceptors.request.use(config => {
            if(token){
                config.headers.Authorization = token;
            }
            return config;
        })

       const responseInterceptor =  api.interceptors.response.use(
            response => response,
            error => {
                console.log(error)
                //Desloguear sis el error en la respuesta fue un 401    
                if(error.response.status === 401){
                    //Mostrar un error al usuario
                    Swal.fire({
                        title: "Error",
                        text: "Sesion vencida o invalida",
                        icon: "error",
                        timer: 1500
                    }).then(() => {
                        logout()
                    })  
                }
            }
        )

        return () => {
            api.interceptors.request.eject(requestInterceptor)
            api.interceptors.request.eject(responseInterceptor)
        }
    }, [token])

    return api;
}

export default useApi