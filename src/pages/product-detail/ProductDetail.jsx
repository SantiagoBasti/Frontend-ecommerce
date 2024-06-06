import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const URL = "https://663ebeffe3a7c3218a4b47e7.mockapi.io"

export default function ProductDetail(){
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)
    const{id} = useParams();

    async function getProductById(id){
        try{
            const response = await axios.get(`${URL}/products/${id}`)

            console.log(response.data)
            setProduct(response.data)
            setLoading(false)
        }catch(error) {
            console.log(error)
        }
    }

    useEffect(() =>{

        getProductById(id)

    }, [])

    if(loading){
        return <h4>Cargando....</h4>;  
    }
    return <h1>{product.name}</h1>;
}