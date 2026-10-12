import { useCarrito } from '../Context/CarritoContext';


const Carrito = () => {
    const { carrito, vaciarCarrito, cobroTotal} = useCarrito();
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
                <div key={item.id} className= "carrito-item" style= {{ marginBottom: '1rem' }}>
                {item.imagen && <img src={ubiImage + item.imagen} alt={ubiImage + item.nombre} width="60" />}
               <h4>{item.nombre}</h4>
               <p>Cantidad: {item.cantidad}</p>
               <p>Precio unitario: ${item.precio}</p>
               <p>Subtotal: ${ (item.precio * item.cantidad).toFixed(2) }</p>
        </div>
            ))}
            <hr />
            <h3>Total a pagar: $ {cobroTotal().toFixed(2)}</h3>
            <button onClick={vaciarCarrito}>Vaciar Carrito</button>
        </>
    )
};

export default Carrito;