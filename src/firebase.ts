import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1BqXaORRX-6OEFxigTCJqMTQ5I7R50EQ",
  authDomain: "fitnova-4e68d.firebaseapp.com",
  projectId: "fitnova-4e68d",
  storageBucket: "fitnova-4e68d.appspot.com",
  messagingSenderId: "117365156823",
  appId: "1:117365156823:web:2bc2d5c54ec03247bb3992"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();