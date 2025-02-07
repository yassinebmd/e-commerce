import { createContext, useContext } from "react";

export const CartContext = createContext({cartItem:[],totalAmount: 0,clearitems:()=>{} , removeitem : ()=>{}, addItemToCart: () => {},updateitem:()=>{}});

export const UseCart = () => useContext(CartContext);