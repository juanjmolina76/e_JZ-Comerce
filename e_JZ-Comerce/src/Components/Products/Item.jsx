const Item = ({id, nombre, precio, descripcion,  stock, img}) => {
    return (
    <div>
        <h1>{nombre}: ${precio}</h1>
        <img src={img} alt={nombre} />


    </div>    
    )
;

}

export default Item;