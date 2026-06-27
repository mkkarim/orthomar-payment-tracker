import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByH8fC6l2_UlDtUK6iQfzP97oX5TVBXdU",
  authDomain: "orthomar-payment-tracker.firebaseapp.com",
  projectId: "orthomar-payment-tracker",
  storageBucket: "orthomar-payment-tracker.firebasestorage.app",
  messagingSenderId: "809916666404",
  appId: "1:809916666404:web:b90428d9b59b7687e13eb1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();