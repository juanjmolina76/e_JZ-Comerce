import { Link } from "react-router-dom";


const Links = () => {
    return (
        <div>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to= "/contacto">Contacto</Link></li>
                <li><Link to="/Carrito">Carrito</Link></li>


            </ul>
        </div>
    )
}   

export default Links;