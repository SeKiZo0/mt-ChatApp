import { createContext, useContext, useEffect } from "react";
import React, { useState } from 'react';
import { auth } from "../firebase";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup} from "firebase/auth";



export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            
        });

        return () => {
            unsub();
        };
    }, []);

    const value = {
        currentUser,
      };

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
}