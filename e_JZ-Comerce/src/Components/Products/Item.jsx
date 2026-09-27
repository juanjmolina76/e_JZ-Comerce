import { useState } from "react";
import estilo from '../Items.module.css';    

const Item  = ({ nombre, precio, descripcion, stock, imagen}) => {
 const [contador, setContador] = useState(0);
 
 const incrementar = () => {if (contador < stock) setContador(contador + 1)};
 const decrementar = () => {if (contador > 0) setContador(contador - 1)};


  return (
    <div className={estilo.item}>
      <h2 >{nombre}</h2>
      <img src={('./datos/images/' + imagen)} alt={nombre} />
      <p>{descripcion}</p>
      <p>Precio: AR${precio}</p>
      <p>Stock: {stock}</p>
      <br/>
      
      <button onClick={incrementar}> + </button>
      <p>{contador}</p>
      <button onClick={decrementar}> - </button>
     
    </div>
    );
};

export default Item;

