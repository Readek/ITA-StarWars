import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "ita-sprint6.firebaseapp.com",
    projectId: "ita-sprint6",
    storageBucket: "ita-sprint6.firebasestorage.app",
    messagingSenderId: "637341146514",
    appId: "1:637341146514:web:2f1596c6dda2c994b2b54b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };