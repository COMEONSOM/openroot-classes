// Import Firebase SDK functions
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// sb8787878
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyASevnap1cBLWdsOFo5Vt2_Vem2ezMOGfc",
  authDomain: "openroot-classes-firebase.firebaseapp.com",
  projectId: "openroot-classes-firebase",
  storageBucket: "openroot-classes-firebase.firebasestorage.app",
  messagingSenderId: "21969607390",
  appId: "1:21969607390:web:27899989e5b1b057b1804f",
  measurementId: "G-1DYLYQDBSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
