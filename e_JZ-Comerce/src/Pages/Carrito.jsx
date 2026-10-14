import { useCarrito } from '../Context/CarritoContext';
import estilo from '../Components/Items.module.css';

const Carrito = () => {
    const { carrito, 
        vaciarCarrito, 
        cobroTotal,
        incrementarCantidad,
        decrementarCantidad,
        eliminarDelCarrito
    
    
    } = useCarrito();


    const ubiImage = "/datos/images/"; // Ruta de la carpeta de imágenes


    if (carrito.length === 0 ) {
        return (
            <div>
                <h1>El carrito está vacío</h1>
                <p>Agrega productos al carrito para continuar la comppra</p>
            </div>
        );
    }

    return (
        <>
            <h1>Carrito de Compras</h1>
            {carrito.map(item => (
                <div key={item.id} className={estilo.item} >
                {item.imagen && <img src={ubiImage + item.imagen} alt={ubiImage + item.nombre} width="60" />}
               <h4>{item.nombre}</h4>
               <p>Cantidad: {item.cantidad}</p>
               <p>Precio unitario: ${item.precio}</p>
               <p>Subtotal: ${ (item.precio * item.cantidad).toFixed(2) }</p>
               
        {/* CONTROLES de cantidad ( + / - )  */ }
        <div>   
                <button onClick={() => incrementarCantidad(item.id)}> + </button>
                <span> {item.cantidad} </span>  
                <button onClick={() => decrementarCantidad(item.id)}> - </button>
                <button onClick={() => eliminarDelCarrito(item.id)}
                    title="Eliminar del carrito"
                     style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#bd7851',
              padding: '1rem'
            }}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
        </div>


        </div>




            ))}
            <hr />
            <h3>Total a pagar: $ {cobroTotal().toFixed(2)}</h3>
            <button onClick={vaciarCarrito}>Vaciar Carrito</button>
            <hr />
        </>
    );
};

export default Carrito;