//EN PROCESO
import { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
import { db } from "../../firebase/config";
import { collection, addDoc, doc, updateDoc} from "firebase/firestore";

const estadoInicial = {
  nombre: "",
  precio: "",
  stock: "",
  categoria: "",
  descripcion: "",
};



const FormProductoContainer = ({ productoAEditar, onProductoAgregado }) => {
  const [ datosForm, setDatosForm ] = useState(estadoInicial);
  const [imagen, setImagen] = useState(null);
  const[cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (productoAEditar) {
      setDatosForm(productoAEditar);
    } else {
      setDatosForm(estadoInicial);
    }
    setErrores({});
  },[productoAEditar]
);


  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm(prev => ({
      ...prev,
      [name]: value,
      
    }));
if (errores[name]) {
  setErrores(prev => ({ ...prev, [name]: null }));
}

  };

  const manejarCambioImagen = (evento) => {
    const archivo = evento.target.files[0];
    setImagen(archivo);
    if (archivo && errores.imagen) {
      setErrores(prev => ({ ...prev, imagen: null }));
    }
  };


const subirImagenImgbb = async (file) => {

    const apiKey = "cede94d994baeb71314353f0a77b618a"; // OCULTAR EN .env  
    const formData = new FormData();
    formData.append("image", file);

   const respuesta = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });


    const datos = await respuesta.json();
    if (!datos.success) throw new Error ("Error al subir imagen");
    return datos.data.url;
  };
  // unimos la URL de la imagen cn el resto d elos datos del formulario
  const manejarEnvio = async (evento) => {
    //para previenir q al presionar el boton, que vuelva a cargar la pagina
    evento.preventDefault();
    //validar que se haya seleccionado un archivo
    setCargando(true);

    // logica para subir la imagen a imgbb y obtener la URL de la imagen
    try {
      let urlImagen = datosForm.imagen || "";

      if (imagen) {
        urlImagen = await subirImagenImgbb(imagen);
      }

      const datosAEnviar = {
        ...datosForm,
        nombre: String(datosForm.nombre),
        precio: Number(datosForm.precio),
        stock: Number(datosForm.stock),
        categoria: String(datosForm.categoria.trim().toLowerCase()),
        imagen: urlImagen//datos.data.url
      };
      
//ACTUALIZO LA BASE DE DATOS
      if (productoAEditar){
        const docRef = doc(db, "productos", productoAEditar.id);
        await updateDoc(docRef, datosForm);

        alert("Producto Actualizado con exito");
//ACTUALIZA EL ESTADO EN LA lista de productos del PANEL
        if (onProductoAgregado) {
          onProductoAgregado ({ id: productoAEditar.id, ...datosAEnviar }, true);
        }

      } else {
        const docRef = await addDoc(collection(db, "productos"), datosAEnviar);
// 
        alert("¡Producto guardado con éxito!");

        if (onProductoAgregado) {
          onProductoAgregado ({ id: docRef.id, ...datosAEnviar }, false);
        }
      };

        // Reseteamos el formulario
      setDatosForm(estadoInicial);
      setImagen(null);

    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      alert("Hubo un error al procesar el envío. Por favor, intentá de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <FormProducto
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
      datosForm={datosForm}
      cargando={cargando}
      esEdicion={!!productoAEditar}
    />
  );
};

export default FormProductoContainer;