import { createContext, useContext } from "react";

export const AuthContext = createContext({username:null,token:null,
    login:()=>{},isauthenticated : Boolean, logout:()=>{}});

export const UseAuth = () => useContext(AuthContext);