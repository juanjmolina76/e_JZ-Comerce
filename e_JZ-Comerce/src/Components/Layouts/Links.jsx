import { Link } from "react-router-dom";
import estilo from "./Nav.module.css";
import { useCarrito } from "../../Context/CarritoContext";
import { useAuth } from "../../Context/AuthContext";



const Links = () => {
    const { itemsEnCarrito } = useCarrito();
    const totalItems = itemsEnCarrito();
    const { user, logout } = useAuth();

    return (
        <div  >
            <ul >
                <li ><Link to="/" className={estilo.navlink}>Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>

                <li><Link to="/principal">Principales</Link></li>
                <li><Link to="/accesorio">Accesorios</Link></li>
                <li><Link to="/insumo">Insumos</Link></li>

                
                <li><Link to= "/contacto">Contacto</Link></li>

                {/**/}
                         {user ? (
                <>
                    {user.rol === "admin" && (
                        <li>
                            <Link to="/panel">Panel</Link>
                        </li>
                    )}

                    <li>
                        <span>Bienvenido, {user.email}</span>
                    </li>

                    <li>
                        <button onClick={logout}>
                            Cerrar Sesión
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/registro">Registro</Link></li>
                </>
            )}

                <li><Link to="/carrito"> 🛒 {totalItems > 0 &&  
                <span>{totalItems}</span>}
                </Link>
                </li>
            </ul>
                 

        </div>
    );
}   

export default Links;