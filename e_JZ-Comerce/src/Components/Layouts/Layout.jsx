import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import  ArribaIcon  from "../../assets/icons/arriba.jsx";
import AbajoIcon from "../../assets/icons/abajo.jsx";

//elimino el  children y lo reempazo por outlet
const Layout = () => {
  return (
    <div >
      <li id="arriba"></li>
      
        <Header/>
        <main>
          <a href="#abajo"><AbajoIcon/></a>
          
          
          <Outlet/>

        </main>
         
        <Footer/>
        <a href="#arriba">
          <ArribaIcon/></a>
          <li id="abajo"></li>
         
    </div>
  );
};

export default Layout;