import { useState, createContext, useContext } from "react";

//creo el contexto
export const CarritoContext = createContext();
// creo el hook para envolver el contexto y poder usarlo en cualquier componente
export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error("useCarrito debe estar dentro de un CarritoProvider");
    };
    return context;
}; 

//creo el Proveedor para envolver la app y poder usar el contexto en cualquier componente
export const CarritoProvider = ({ children}) => {
    const [carrito, setCarrito] = useState([])

    const agregarACarrito = ({ producto, cantidad = 1 }) => {
        const itemEnCarrito = carrito.find(item => item.id === producto.id);

        if (itemEnCarrito) {
            const carritoActualizado = carrito.map(item => 
                item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
            );

            setCarrito(carritoActualizado);
        } else {
            setCarrito(carritoPrevio => [...carritoPrevio, { ...producto, cantidad }]);
        }
    };


const vaciarCarrito = () => {
    setCarrito([]);
};

const itemsEnCarrito = () => {
    return carrito.reduce((acc, item) => acc + item.cantidad, 0);
};

const cobroTotal = () => {
    return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);


};
//creo el consumidor de contexto para poder usarlo en cualquier componente
return (
    <CarritoContext.Provider value= {
        {carrito,
        agregarACarrito,
        vaciarCarrito,
        itemsEnCarrito,
        cobroTotal  
        }
        }>

        { children }

        </CarritoContext.Provider>
    );
};