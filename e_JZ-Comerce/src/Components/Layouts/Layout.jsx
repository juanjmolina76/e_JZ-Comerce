import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div >
        <Header/>
        <main>

          // elimino el  children y lo reempazo por outlet
          
          <Outlet/>

        </main>
        <Footer/>
    </div>
  );
};

export default Layout;