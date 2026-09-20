const Item = ({id, nombre, precio, descripcion,  stock, imagen}) => {
    return (
    <div>
        <h1>{nombre}: ${precio}</h1> 
    </div>    
    )
;

}

export default Item;