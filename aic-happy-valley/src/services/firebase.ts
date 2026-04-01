import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYNrZVsvcRkiOBCwBKhUhlezhWnEkXBUw",
  authDomain: "aic-happy-valley.firebaseapp.com",
  projectId: "aic-happy-valley",
  storageBucket: "aic-happy-valley.firebasestorage.app",
  messagingSenderId: "1091541177539",
  appId: "1:1091541177539:web:b624752f3038ced6363e76",
  measurementId: "G-CRDWXMYQ8S"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
