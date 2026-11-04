import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const manejarLogin = async (evento) => {
        evento.preventDefault();
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)

            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Usuario logueado:", user);
                alert("Inicio de sesión exitoso");//hacer un modal reemplazando el alert
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;// captura el codigo del error, por ejemplo: auth/wrong-password, auth/user-not-found, etc.
                const errorMessage = error.message; //captura la descripcion del error
                console.error("Error en el Login:", errorCode, errorMessage);
                alert("Error en el Login: " + errorMessage);
            });
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={manejarLogin}>
                <div>
                <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(evento) => setEmail(evento.target.value)}
                        required //
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(evento) => setPassword(evento.target.value)}
                        required//
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;