import { Link } from "react-router-dom";
import NotrosListContainer from "../Nosotros/NosotrosListContainer";

const Footer = () => {
  return (
    <div>

        <p>© 2024 e_JZ-Comerce. Todos los derechos reservados.</p>
        <Link to="/terminos" target="_blank" rel="noopener noreferrer">Términos y condiciones</Link>
        <Link to="/contactos" target="_blank" rel="noopener noreferrer">contacto@e_JZ-Comerce.com</Link>
        <br />     
        <br />  
        <p>Sucursales</p>
        <ul>
            <li>Ciudad 1</li>
            <li>Ciudad 2</li>
            <li>Ciudad 3</li>
        </ul>
        <NotrosListContainer/>
    </div>
    
    )
}
export default Footer;

