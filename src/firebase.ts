import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZ1XngZde0bae-4Zz8ECL2pnb5SaF_tdI",
  authDomain: "binventory.dteske.dev",
  projectId: "inventory-tracker-434102",
  storageBucket: "inventory-tracker-434102.appspot.com",
  messagingSenderId: "293327244485",
  appId: "1:293327244485:web:6593ecf3b909f04dc0b4ac",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
