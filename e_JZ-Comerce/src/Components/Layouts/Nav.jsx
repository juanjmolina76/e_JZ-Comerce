import Links from "./Links";
import estilo from "./Nav.module.css";

const Nav = () => {
    return (
        <div className={estilo.nav}>
            <nav >
                <Links />
            </nav>
        </div>
    );
};

export default Nav;