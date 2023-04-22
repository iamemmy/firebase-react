import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import React, { useState } from 'react'
import '../styles/Register.css'

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword( auth, email, password );
    }
    catch (err) {
      console.error()
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup( auth, googleProvider );
    }
    catch (err) {
      console.error()
    }
  };

  const logout = async () => {
    try {
      await signOut( auth );
    }
    catch (err) {
      console.error()
    }
  };

    return (
      <div>
        <input type="text" placeholder='Email' 
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" placeholder='Password' 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>Sign in</button>
        <button onClick={signInWithGoogle}>Google</button>
        <button onClick={logout}>Logout</button>
      </div>
    )
}
