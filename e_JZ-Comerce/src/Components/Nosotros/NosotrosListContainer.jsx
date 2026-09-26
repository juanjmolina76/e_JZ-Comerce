import NosotrosList from "./NosotrosList";
import { useState, useEffect } from "react";

const NosotrosListContainer = () => {
    const [nosotros, setNosotros] = useState([]);

    useEffect(() => {
        fetch('/datos/nosotros.json')
            .then(res => res.json())
            .then(datos => setNosotros(datos));
    }, []);

  return (
<NosotrosList nosotros={nosotros} />
  );
}   

export default NosotrosListContainer;