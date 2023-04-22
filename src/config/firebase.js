import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD6kCG3KrmbIzZ4wieQy2CMirNGt9UsOJY",
  authDomain: "fir-course-21a53.firebaseapp.com",
  projectId: "fir-course-21a53",
  storageBucket: "fir-course-21a53.appspot.com",
  messagingSenderId: "819302462762",
  appId: "1:819302462762:web:f3f3ab10724d565a6f1a53",
  measurementId: "G-NM4XHNRX4S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);