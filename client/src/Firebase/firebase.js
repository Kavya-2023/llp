// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDMLITGLBB7Rrcxx-bzujd1G2KNke1a-70",
  authDomain: "llp-nanoquest.firebaseapp.com",
  projectId: "llp-nanoquest",
  storageBucket: "llp-nanoquest.appspot.com",
  messagingSenderId: "583520234132",
  appId: "1:583520234132:web:db908514c0ed09590a6281",
  measurementId: "G-VH4WK715VZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

export {app,auth};
