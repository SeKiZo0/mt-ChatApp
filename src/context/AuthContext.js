import { createContext, useContext, useEffect } from "react";
import React, { useState } from 'react';
import { auth } from "../firebase";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect} from "firebase/auth";



export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider).then((result) => {
            const displayName = result.user.displayName;
            const email = result.user.email;
            const photoURL = result.user.photoURL;
            const uid = result.user.uid;
            const user = result.user;
            localStorage.setItem("displayName", displayName);
            localStorage.setItem("email", email);
            localStorage.setItem("photoURL", photoURL);
            localStorage.setItem("uid", uid);
            localStorage.setItem("user", user);

          });
    }

    

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            
        });

        return () => {
            unsub();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, googleSignIn  }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
}