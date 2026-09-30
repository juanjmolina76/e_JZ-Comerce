//EN PROCESO
//<Route path="/producto/:id" element= {<DetalleProducto/>}/>
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import estilo from '../Products/DetalleProducto.module.css'

const DetalleProducto = () => {
 const { id } = useParams();

 const [producto, setProducto] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error,setError] = useState(null);

 useEffect (() => { 
    setLoading(true);
    setError(null);

    fetch('/datos/productos.json')
        .then((res) =>{
            if(!res.ok) throw new Error ("No se pudo cargar el producto");
            return res.json();
        })
        .then((datos) => {
        const encontrado = datos.find((p) => String(p.id) === id);
        setProducto(encontrado || null);
        })
        .catch (error => setError(error.message))
        .finally(() => setLoading(false));
 },[id]);

if (loading) return <p>Cargando...</p>;
if (error) return <p>{error}</p>;
if (!producto) return <p>Producto no encontrado</p>;


 return (
    <div className={estilo.item}>
        <p>Nombre: {producto.nombre}</p>
        <img src={`/datos/images/${producto.imagen}`} alt={producto.nombre}/>
        <p>{producto.descripcion}</p>
        <p>Precio: AR${producto.precio}</p>
        <p>Stock: {producto.stock}</p>
    </div>
 );
};

export default DetalleProducto;
