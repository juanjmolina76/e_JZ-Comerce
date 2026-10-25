//EN PROCESO
import { useState } from "react";
import FormProducto from "./FormProducto";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const FormProductoContainer = () => {
  const [ datosForm, setDatosForm ] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
    descripcion: "",
     });

  const [imagen, setImagen] = useState(null);
  const[cargando, setCargando] = useState(false);


  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm({
      ...datosForm,
      [name]: value,
      
    });
  };

  const manejarCambioImagen = (evento) => {
    setImagen(evento.target.files[0]);
  };



  const manejarEnvio = async (evento) => {
    //para previenir q al presionar el boton, que vuelva a cargar la pagina
    evento.preventDefault();
    //validar que se haya seleccionado un archivo

    //TUVE QUE SACAR LA VALIDACION QUE NO ME DEJABA SUBIR LA IMAGEN A IMGBB NI EL PRODUCTO A FIRESTORE
     /*if (!imagen) {
    alert("Por favor, selecciona un archivo de imagen.");
    return;
    }
*/
    setCargando(true);

    // logica para subir la imagen a imgbb y obtener la URL de la imagen

    const apiKey = "061bfceef1d958d4fe3eea7614117dd3"; // OCULTAR EN .env  
    const formData = new FormData();
    formData.append("image", imagen);

    try {
      console.log("Subiendo imagen a imgbb...");
      const respuestaImgbb = await fetch (
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method:"POST",
          body: formData,
        }
      );

      const datosImgbb = await respuestaImgbb.json();
      if (datosImgbb.success) {
      console.log ("imagen subida con exito, URL: ", datosImgbb.data.url);
      
      // unimos la URL de la imagen cn el resto d elos datos del formulario
        const productoCompleto ={  
      ...datosForm,
        imagen: datosImgbb.data.url,
      };

      // logica para subir datos a Firestore a la coleccion productos
      console.log('Enviando producto a Firebase:', productoCompleto);
        const productosCollection = collection(db, "productos");
        await addDoc(productosCollection, productoCompleto);

        alert("¡Producto guardado con éxito!");

        // Reseteamos el formulario
        setDatosForm({nombre: "", precio: "", stock: "", descripcion: "" });
        setImagen(null);
        
      } else {
        throw new Error("La subida de la imagen a Imgbb falló.");
      }
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
    />
  );
};

export default FormProductoContainer;
      

   