import estilo from '../Items.module.css';    

const Item  = ({ nombre, precio, descripcion, stock, imagen}) => {
  return (
    <div className={estilo.item}>
      <h2 >{nombre}</h2>
      <img src={('./datos/images/' + imagen)} alt={nombre} />
      <p>{descripcion}</p>
      <p>Precio: AR${precio}</p>
      <p>Stock: {stock}</p>
     
    </div>
    );
};

export default Item;

