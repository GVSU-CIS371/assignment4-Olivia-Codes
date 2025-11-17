
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAg_R6Tz1dwtr4aVmcJGOe5ogv4_1x6CK8",
  authDomain: "brew-and-save-project4.firebaseapp.com",
  projectId: "brew-and-save-project4",
  storageBucket: "brew-and-save-project4.firebasestorage.app",
  messagingSenderId: "664552986490",
  appId: "1:664552986490:web:4a6b9ed59bbd70ff0da8c3",
  measurementId: "G-GB6RS8Y7JF"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);


export default db;