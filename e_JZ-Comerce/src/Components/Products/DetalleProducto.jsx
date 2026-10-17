import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import estilo from '../Products/DetalleProducto.module.css'
import { useCarrito } from "../../Context/CarritoContext";
import { db } from "../../firebase/config.js";
import { doc, getDoc } from "firebase/firestore";


const DetalleProducto = () => {
 const { id } = useParams();
 const { agregarACarrito } = useCarrito();

 const [producto, setProducto] = useState(null);
 const [cargando, setCargando] = useState(true);
 const [error,setError] = useState(null);

 useEffect (() => { 
    const fetchProducto = async () => {
        try {
    setCargando(true);
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);  
        if (docSnap.exists()) {
            setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
            setError("Producto no encontrado");
        }
    }   catch (error) {
            console.error("Error al obtener el producto de Firestore:", error);
            setError("Error al cargar el producto");
    }   finally {
            setCargando(false);
        }
    };
    fetchProducto();
    },[id]);


 const manejarAgregarAlCarrito =() => {
// al venir de firestore, las propiedades  ya se llaman: nombre, precio e imagen
    agregarACarrito({ producto, cantidad: 1 });
 }

if (cargando) return <p>Cargando detalle de producto...</p>;
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
