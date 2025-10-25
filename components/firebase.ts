// firebase.ts
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Your Firebase configuration
// Replace these values with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyBdc0pY6X9jORUpbpT3vHXRzE-noEcAYJs",
  authDomain: "to-do-7f900.firebaseapp.com",
  projectId: "to-do-7f900",
  storageBucket: "to-do-7f900.firebasestorage.app",
  messagingSenderId: "1024998883781",
  appId: "1:1024998883781:web:6f289721a7c53732164bac",
  measurementId: "G-F1DY60105B"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
export const db: Firestore = getFirestore(app);

// Export the app instance if needed elsewhere
export default app;