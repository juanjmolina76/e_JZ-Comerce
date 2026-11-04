import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../Context/AuthContext'; // Importamos el hook personalizado para usar el contexto de autenticación

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { signup } = useAuth(); // Usamos el hook personalizado para obtener la función de registro
  

  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    setError(null); // Reseteamos cualquier error previo
    try {
      // Intentamos crear el nuevo usuario en Firebase
      //await createUserWithEmailAndPassword(auth, email, password);

      //Creamos el usuario usando la funcion 'signup' del AuthContext

      const credencialUsuario = await signup(email, password);
      const user = credencialUsuario.user;

      //Guardo los datos adicianales en Firestore, usando el UID generado
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: nombre,
        apellido: apellido,
        email: email,
        rol: "usuario", // Asignamos un rol por defecto
      });
      


      // Si la creación es exitosa, lo redirigimos al inicio
      // Firebase ya gestiona el estado de sesión automáticamente
      navigate("/");
    } catch (error) {
      // Aquí es donde manejamos el caso específico que nos interesa
      if (error.code === "auth/email-already-in-use") {
        // Usamos window.confirm para hacer la pregunta al usuario
        const quiereLoguearse = window.confirm(
          "Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?",
        );

        if (quiereLoguearse) {
          // Si el usuario confirma, lo redirigimos a la página de login
          navigate("/login");
        } else {
          // Si el usuario cancela, lo redirigimos a la página de inicio
          navigate("/");
        }
      } else {
        // Para cualquier otro error (contraseña débil, email inválido, etc.),
        // mostramos un mensaje genérico.
        setError(
          "Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.",
        );
        console.error("Error en el registro:", error.message);
      }
    }
  };
  
  return (
    <div className="auth-container">
      <h2>Crear una nueva cuenta</h2>
      <form onSubmit={manejarSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(evento) => setApellido(evento.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
            required
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;