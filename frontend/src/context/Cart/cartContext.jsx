import { createContext, useContext } from "react";

export const CartContext = createContext({cartItem:[],totalAmount: 0, addItemToCart: () => {}});

export const UseCart = () => useContext(CartContext);