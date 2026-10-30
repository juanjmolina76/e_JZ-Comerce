const FormProducto = ({
    manejarCambio,
    manejarEnvio,
    manejarCambioImagen,
    datosForm,
    esEdicion,
    cargando
}) => {
    return (
<>
    <form onSubmit={manejarEnvio}>
        <h3>NUEVO PRODUCTO</h3>
        <div>
        <label>Nombre:</label>
        <input 
        name="nombre"
        type="text"
        value={datosForm.nombre}
        onChange={manejarCambio}
        />
        </div>
         <div>
        <label>Precio:</label>
        <input
          name="precio"
          type="number"
          value={datosForm.precio}
          onChange={manejarCambio}
        />
      </div>
      <div>
        <label>Stock:</label>
        <input 
          name="stock"
          type="number" 
          value={datosForm.stock} 
          onChange={manejarCambio} 
        />
      </div>
      <div>
        <label>Categoría:</label>
        <select 
          name="categoria" 
          value={datosForm.categoria || ""} 
          onChange={manejarCambio}
          >
          <option value="" disabled>Selecciona categoría</option>
          <option value="principal">Principal</option>
          <option value="insumo">Insumo</option>
          <option value="accesorio">Accesorio</option>
        </select>
      </div>

      <div>
        <label>Descripcion:</label>
        <textarea
          name="descripcion"
          type="text" 
          value={datosForm.descripcion} 
          onChange={manejarCambio} 
        />
      </div>
      {/*Campo Imagen*/}
      <div>
        <label>Imagen:</label>
        <input 
          name="imagen"
          type="file"
          onChange={manejarCambioImagen} 
        />
      </div>

{/*Vista preiva si ya existe una imagen en edicion*/}
{esEdicion && datosForm.imagen && (
  <div>
    <span >Imagen Actual: </span>
    <br/>
    <img src={datosForm.imagen} alt="vista previa"/>
  </div>
)}

      
      <button type="submit" disabled={cargando}>
        {cargando ? "Procesando..": esEdicion ? "Guardar Cambios" : "Crear Producto"}
      </button>

        </form>
    </>    
    );
};

export default FormProducto;
