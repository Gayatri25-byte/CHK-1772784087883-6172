// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1BqXaORRX-6OEFxigTCJqMTQ5I7R50EQ",
  authDomain: "fitnova-4e68d.firebaseapp.com",
  databaseURL: "https://fitnova-4e68d-default-rtdb.firebaseio.com",
  projectId: "fitnova-4e68d",
  storageBucket: "fitnova-4e68d.firebasestorage.app",
  messagingSenderId: "117365156823",
  appId: "1:117365156823:web:2bc2d5c54ec03247bb3992"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);



// Initialize Google Provider
export const googleProvider = new GoogleAuthProvider();

// Optional: Add scopes if you need more user info
googleProvider.addScope("https://www.googleapis.com/auth/userinfo.email");
googleProvider.addScope("https://www.googleapis.com/auth/userinfo.profile");

// Optional: Set custom parameters
googleProvider.setCustomParameters({
  prompt: "select_account" // Forces account selection every time
});