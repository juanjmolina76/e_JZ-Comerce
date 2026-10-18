import { Link } from "react-router-dom";
import estilo from "./Nav.module.css";
import { useCarrito } from "../../Context/CarritoContext";


const Links = () => {
    const { itemsEnCarrito } = useCarrito();
    const totalItems = itemsEnCarrito();

    return (
        <div  >
            <ul >
                <li ><Link to="/" className={estilo.navlink}>Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>

                <li><Link to="/principal">Principales</Link></li>
                <li><Link to="/accesorio">Accesorios</Link></li>
                <li><Link to="/insumo">Insumos</Link></li>

                <li><Link to= "/contacto">Contacto</Link></li>
                <li><Link to="/carrito"> 🛒 {totalItems > 0 &&  
                <span>{totalItems}</span>}
                </Link>
                </li>
            </ul>
                 

        </div>
    );
}   

export default Links;