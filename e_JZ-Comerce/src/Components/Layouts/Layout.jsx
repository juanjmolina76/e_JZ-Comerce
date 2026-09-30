import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
//elimino el  children y lo reempazo por outlet
const Layout = () => {
  return (
    <div >
      <li id="arriba"></li>
        <Header/>
        <main>
          <a href="#abajo">Bajar</a>
          
          
          <Outlet/>

        </main>
       
        <Footer/>
        <li id="abajo"></li>
         <a href="#arriba">Subir</a>
    </div>
  );
};

export default Layout;