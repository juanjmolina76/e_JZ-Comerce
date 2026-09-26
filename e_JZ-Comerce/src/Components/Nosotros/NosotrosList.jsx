import Nosotros from "./Nosotros";

const NosotrosList = ({ nosotros }) => {
    return (
        <>   
            <h2>Nosotros</h2>
            {nosotros.map((nosotros) => (
                <Nosotros key={nosotros.id} {...nosotros} />
            ))}
        </>  
    )
}   

export default NosotrosList;
