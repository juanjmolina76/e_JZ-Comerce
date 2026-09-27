import Nav from './Nav.jsx';
import estilo from "./Header.module.css";

const Header = () => {
  return (
    <div className={estilo.headerContainer}>
        <p>Header</p>
        <Nav/>
    </div>
  )
}

export default Header;
