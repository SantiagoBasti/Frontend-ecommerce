import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <>
    <Header />

        <main className="main-container">

        <Outlet/>

        </main>

    <Footer />
        
        </>

    )
}