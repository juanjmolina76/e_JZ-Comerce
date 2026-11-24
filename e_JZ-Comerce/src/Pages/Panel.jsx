import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import FormProductoContainer from '../Components/Products/FormProductoContainer';
import styles from './Panel.module.css';

const Panel = () => {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  // Carga inicial de productos desde Firestore
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosRef = collection(db, "productos");
        const resp = await getDocs(productosRef);
        setProductos(
          resp.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);


  const eliminarProducto = async (id) => {
    const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
    if (confirmacion) {
      try {
        const docRef = doc(db, "productos", id);
        await deleteDoc(docRef);
        // Actualizamos el estado local para quitarlo de la lista en la UI
        setProductos(productos.filter((prod) => prod.id !== id));
        alert("Producto eliminado.");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Hubo un error al intentar eliminar el producto.");
      }
    }
  };







 const abrirModalAgregar = () => {
    setProductoAEditar(null);
    setModalAbierto(true);
  };

  const abrirModalEditar = (producto) => {
    setProductoAEditar(producto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setProductoAEditar(null);
    setModalAbierto(false);
  };





  const handleProductoGuardado = (productoGuardado, esEdicion) => {
    if (esEdicion) {
      setProductos(prev => prev.map(p => p.id === productoGuardado.id ? productoGuardado : p));
    } else {
      setProductos(prev => [...prev, productoGuardado]);
    }
    cerrarModal();
  };







  return (
    <>
    <div className={styles.container}>
      <h2>Panel de Administración</h2>
      
      <div>
          <h3>Lista de Productos</h3>
          <button onClick={abrirModalAgregar}>
            <span> + </span> Agregar Producto
          </button>
      </div>
      <hr />
      

    {productos.length === 0 ? (
      <p>No hay productos cargados todavia.</p>
    ) : (

      <div className={styles}>
        <table>
          <thead>
          <tr>
            <th>nombre</th>
            <th>precio</th>
            <th>imagen</th>
            <th>Edicion</th>
         </tr>
         </thead>
         <tbody>
          
          {productos.map(prod => (
            <tr key={prod.id} >
             <td> {prod.nombre} </td>
             <td> ${prod.precio}</td>
             <td><img src={prod.imagen} /></td>
            
              <td style={{ textAlign: 'right'}}>
              <button 
                onClick={() => abrirModalEditar(prod)}
              >Editar</button>
              <button 
                onClick={() => eliminarProducto(prod.id)} 
                style={{ marginLeft: '10px' }}
              >
                Eliminar
              </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )}
      <hr />
      {/*Modal para agregar o editar productos*/ }
      {modalAbierto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div>
            <h3 >
              {productoAEditar ? 'Editar Producto' : 'Agregar Nuevo Producto'}
             </h3>
            <button onClick={cerrarModal}>X</button>

          </div>

        <FormProductoContainer
          productoAEditar={productoAEditar}
          setProductoAEditar={setProductoAEditar}
          onProductoAgregado={(producto, esEdicion) => handleProductoGuardado(producto, esEdicion)}
        />

          </div>
        </div>


      )}
     </div>
    </>
  );
};

export default Panel;