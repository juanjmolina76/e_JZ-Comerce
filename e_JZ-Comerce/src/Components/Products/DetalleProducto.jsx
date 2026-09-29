//EN PROCESO
//<Route path="/producto/:id" element= {<DetalleProducto/>}/>
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const DetalleProducto = () => {
 const { id } = useParams();

 const [producto, setProducto] = useState();


 useEffect (() => { 
    fetch('/datos/productos.json/${id}')
        .then(res => res.json())
        .then(datos => setProducto(datos));
//FILTRAR EL JSON por el id
//datos?.find(p => String(p.id) === id) ?? {};

 },[id]);


 return (
    <div>
        <p><strong>Nombre</strong> {producto.nombre}</p>
    </div>
 );



};

export default DetalleProducto;
