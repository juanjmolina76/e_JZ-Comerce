// Importo las fnciones que quiero usar de firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Mi configuracion de Firebase
const firebaseConfig = {
  apiKey : import.meta.env.VITE_FB_API_KEY,
  authDomain : import.meta.env.VITE_FB_AUTHDOMAIN,
  projectId : import.meta.env.VITE_FB_PROJECTID,
  storageBucket : import.meta.env.VITE_FB_STORAGEBUCKET,
  messagingSenderId:  import.meta.env.VITE_FB_MESSAGINGSENDERID,
  appId : import.meta.env.VITE_FB_APPID,
};

// Inicializo Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

