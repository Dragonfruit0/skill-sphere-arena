// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCySCseV7OclUjgJozHt2TjMtBM6n347NY",
  authDomain: "skill-sphere-252cb.firebaseapp.com",
  databaseURL: "https://skill-sphere-252cb-default-rtdb.firebaseio.com",
  projectId: "skill-sphere-252cb",
  storageBucket: "skill-sphere-252cb.firebasestorage.app",
  messagingSenderId: "297989566166",
  appId: "1:297989566166:web:037f45c6708125e0072377",
  measurementId: "G-784QLJV8DV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
