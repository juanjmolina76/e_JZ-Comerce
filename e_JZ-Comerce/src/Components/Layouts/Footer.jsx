import NotrosListContainer from "../Nosotros/NosotrosListContainer";

const Footer = () => {
  return (
    <div>

        <p>© 2024 e_JZ-Comerce. Todos los derechos reservados.</p>
        <a href="https://www.ejemplo.com/terminos" target="_blank" rel="noopener noreferrer">Términos y condiciones</a>
        <a href="https://www.ejemplo.com/contacto" target="_blank" rel="noopener noreferrer">contacto@e_JZ-Comerce.com</a>
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

