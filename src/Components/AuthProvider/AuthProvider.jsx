import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { app } from '../../FirebaseConfig/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth/cordova';
const auth=getAuth(app)
export const AuthContext=createContext();
const AuthProvider = ({children}) => {
    const [user,setUser]=useState();
    const [loader,setLoader]=useState(true)
    const register=(email,pass)=>{
        setLoader(true);
        return createUserWithEmailAndPassword(auth,email,pass);
    }

    const login=(email,pass)=>{
        setLoader(true);
        return signInWithEmailAndPassword(auth,email,pass);
    }

    const logout=()=>{
       setLoader(true)
       return signOut(auth)

    }


    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoader(false);
        })
        return ()=>{
            unsubscribe;
        }
    },[])


    const authvalue={register,login,logout,user,loader}
    return (
        <AuthContext.Provider value={authvalue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;