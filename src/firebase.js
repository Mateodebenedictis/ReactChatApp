import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuuZKdU_X948itlkz1nH4niJJgpN7hCPg",
  authDomain: "mateo-react-chat-app.firebaseapp.com",
  projectId: "mateo-react-chat-app",
  storageBucket: "mateo-react-chat-app.appspot.com",
  messagingSenderId: "339251025211",
  appId: "1:339251025211:web:9c2bdd41520063b2bc531e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
