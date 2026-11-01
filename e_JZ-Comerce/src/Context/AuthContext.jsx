import { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext();
// Custom hook para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};

// Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(); // obtenemos la instancia de auth una sola vez
    // funcion para registrar un nuevo usuario
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    //funcion para inciciar sesion
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    // funcion para cerrar sesion
    const logout = () => {
        signOut(auth);
    };

    useEffect(() => {
        // onAuthStateChanged es el observador de Firebase
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
           if (currentUser) {
                //si hay un usuario logueado, buscamos su rol en Firestore
                const userDocRef = doc(db, "usuarios", currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists() && userDocSnap.data().rol === "admin") {
                    // si el documento existe y tiene rol de admin, lo asignamos.
                    setUser({ ...currentUser, rol: "admin" });
                } else {
                    // para cualquier otro caso, asignamos rol de user
                    setUser({ ...currentUser, rol: "user"});
                }
            } else {
                setUser(null); // no hay usuario logueado
            }
                setLoading(false);
            }); 
            // limpia del observador al desmontar
            return () => unsubscribe(); 
}, []);
       
// crear el objeto 'value' con TODAS las funciones definidas
    const value = {

        user,
        loading,
        signup,
        login,
        logout,
    };
// Retornar el Provides, asegurandonos de no renderizar hasta que cargue
// esto evita qu elos componentes hijos puedan acceder al 'user' cuando es null

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};