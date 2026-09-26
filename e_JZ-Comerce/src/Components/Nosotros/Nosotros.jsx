import estilo from './Nosotros.module.css';

const Nosotros = ({ nombre, descripcion, imagen, profesion}) => {
    return (
        <div className={estilo.nosotros}>
            <h2>{nombre}</h2>
            <img src={('./datos/imgNosotros/' + imagen)} alt={nombre} />
            <h3>Profesion: {profesion}</h3>
            <p>{descripcion}</p>

        </div>
    );
};


export default Nosotros;
