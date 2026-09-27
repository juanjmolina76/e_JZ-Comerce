import { Link } from "react-router-dom";
import estilo from "./Nav.module.css";

const Links = () => {
    return (
        <div  >
            <ul >
                <li ><Link to="/" className="outline" ClassName={estilo.navlink}>Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to= "/contacto">Contacto</Link></li>
                <li><Link to="/Carrito">Carrito</Link></li>


            </ul>
        </div>
    )
}   

export default Links;