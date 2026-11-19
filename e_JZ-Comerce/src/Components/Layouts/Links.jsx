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
            <ul  >
                <li ><Link to="/" className={estilo.navlink}>Inicio</Link></li>
                <li><Link to="/productos" className={estilo.navlink}>Productos</Link></li>

                <li><Link to="/principal"className={estilo.navlink}>Principales</Link></li>
                <li><Link to="/accesorio"className={estilo.navlink}>Accesorios</Link></li>
                <li><Link to="/insumo"className={estilo.navlink}>Insumos</Link></li>

                
                <li><Link to= "/contacto"className={estilo.navlink}>Contacto</Link></li>

                {/**/}
                         {user ? (
                <>
                    {user.rol === "admin" && (
                        <li>
                            <Link to="/panel"className={estilo.navlink}>Panel</Link>
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