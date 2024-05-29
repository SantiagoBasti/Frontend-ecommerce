import { useParams } from "react-router-dom";

export default function ProductDetail(){
    const{id} = useParams();

    console.log(id)

    return(
        <>
        <h1>Product Detail <button>Añadir</button></h1>
        
        </>
    );
}
