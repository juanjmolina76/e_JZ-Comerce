import Nav from './Nav.jsx';
import estilo from "./Header.module.css";
import { useSearch } from "../../Context/SearchContext.jsx";
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const { busqueda, setBusqueda } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();


const manejarCambio = (evento) => {
  const valor = evento.target.value;
  setBusqueda(valor);


  // si el usuario escribe y no está en la pagina productos, lo llevo allí
  if (location.pathname !== "/productos") {
    navigate("/productos");
  }
};



  return (
    <div className={estilo.headerContainer}>
        <p>Header</p>



        { /* Barra de busqueda */}
        <form
        onSubmit= {(evento) => evento.preventDefault()}>
        <input
          type="text"
          placeholder="Buscar productos..."   
          value= {busqueda}
          onChange={manejarCambio}  
        />
        {busqueda && (
        <button
        type='button'
        onClick={() => setBusqueda("")}
        >
          ✕
        </button>
        )}

        </form>
        <Nav/>
    </div>
  )
}

export default Header;
