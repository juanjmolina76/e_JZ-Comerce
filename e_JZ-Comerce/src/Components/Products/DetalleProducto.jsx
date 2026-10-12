import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import estilo from '../Products/DetalleProducto.module.css'
import { useCarrito } from "../../Context/CarritoContext";


const DetalleProducto = () => {
 const { id } = useParams();
 const { agregarACarrito } = useCarrito();

 const [producto, setProducto] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error,setError] = useState(null);

 const manejarAgregarAlCarrito =() => {

    agregarACarrito({ producto, cantidad: 1 });
 }



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
        <Link to="/productos" className={estilo.volver}>Volver a productos</Link>
        <h2>Detalle del producto</h2>
        <p>Nombre: {producto.nombre}</p>
        <img src={`/datos/images/${producto.imagen}`} alt={producto.nombre}/>
        <p>{producto.descripcion}</p>
        <p>Precio: AR${producto.precio}</p>
        <p>Stock: {producto.stock}</p>

        <button onClick={manejarAgregarAlCarrito}>
            Agregar al carrito
        </button>
    </div>
 );
};

export default DetalleProducto;
