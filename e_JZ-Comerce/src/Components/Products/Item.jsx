import estilo from '../Items.module.css';    

const Item  = ({ nombre, precio, descripcion }) => {
  return (
    <div className={estilo.item}>
      <h2 >{nombre}</h2>
      <p>{descripcion}</p>
      <p>Precio: AR${precio}</p>
    </div>
    );
};

export default Item;

