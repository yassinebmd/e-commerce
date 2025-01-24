import PropTypes from 'prop-types';
import { CartContext } from './cartContext.jsx';
import { useState } from 'react';


export const CartProvider = ({ children }) => {
   const [cartItem , setCartItem] = useState([])
   const [totalAmount, setTotalAmount] = useState(0)

   const addItemToCart = (productId) => {
    console.log(productId);
    
   }
    return (
        <CartContext.Provider value={{ cartItem, totalAmount, setCartItem, setTotalAmount, addItemToCart}}>
            {children}
        </CartContext.Provider>

    )
}
CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartProvider;