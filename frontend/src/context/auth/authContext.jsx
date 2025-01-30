import { createContext, useContext } from "react";

export const AuthContext = createContext({username:null,token:null,
    login:()=>{},getMyOrders : ()=>{},isauthenticated : Boolean, logout:()=>{},myorders:[]});

export const UseAuth = () => useContext(AuthContext);