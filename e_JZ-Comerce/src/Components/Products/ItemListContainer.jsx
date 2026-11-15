import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config.js";
import { useSearch } from "../../Context/SearchContext.jsx";    

const ItemListContainer = () => {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando]= useState(true);
    const [error, setError]= useState(null);


//Obtengo el texto de busqueda global desde el contexto SearchContext en Header
    const { busqueda } = useSearch();

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const productosRef = collection(db, "productos");
                const resp = await getDocs(productosRef);

                const listaProductos = resp.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));

                setProductos(listaProductos);
            } catch (error) {
                console.error("Error al obtener productos de Firestore:", error);
                setError("No se pudieron cargar los productos");
            } finally {
                setCargando(false);
            }
        };

        obtenerProductos();
}, []);


// Filtro los productos d eFirestore segun lo escrito en la barra de busqueda. Si no hay nada escrito, se muestran todos los productos.
const productosFiltrados = productos.filter(prod =>
    prod.nombre?.toLowerCase().includes(busqueda.toLowerCase())
);




    if (cargando) 
        return <p>Cargando...</p>;
    if (error) 
        return <p>{error} </p>;

    return (
        <section >
            <h1>Productos</h1>
            {productosFiltrados.length === 0 ? (
                <div >
            {busqueda 
            ?  `No se encontraron productos que coincidan con "${busqueda}"` 
            :  `No hay productos disponibles.` }
            </div>
            ) : (
                <ItemList productos= {productosFiltrados} />
            )}
        </section>
    )
};     

export default ItemListContainer;