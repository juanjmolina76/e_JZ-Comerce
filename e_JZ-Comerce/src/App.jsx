import './App.css';
import Inicio from './Components/Inicio.jsx';
import Layout from './Components/Layouts/Layout.jsx';
import ItemListContainer from './Components/Products/ItemListContainer.jsx';
import DetalleProducto from './Components/Products/DetalleProducto.jsx';
import { Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <>
    <Routes>  
      <Route element= {<Layout/>}>
        <Route path="/" element={<h1>Mate Libre</h1>}/>
        <Route path="/contacto" element={<h1>CONTACTO</h1>}/>
        <Route path="/inicio" element={<Inicio/>}/>
        <Route path="/producto/:id" element={<DetalleProducto/>}/>
        <Route path="/productos" element= {<ItemListContainer/>}/>
        
      </Route>  
    </Routes>
    </>
  );
};

export default App
