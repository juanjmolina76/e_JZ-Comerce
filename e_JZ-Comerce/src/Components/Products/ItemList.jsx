import Item from './Item';


const ItemList = ({productos}) => {
    return (
        <ul>   
            {productos.map(producto => (
                <li key={producto.id}>{producto.nombre}: {producto.precio}</li>
            ))}
        </ul>  
    )
}   

export default ItemList;