import PropTypes from 'prop-types';
import { CartContext } from './cartContext.jsx';
import { useState } from 'react';
import { UseAuth } from '../auth/authContext.jsx';


export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [error, setError] = useState('')
    const { token } = UseAuth()
    const addItemToCart = async (productID) => {
        try {
            const response = await fetch(`http://localhost:5001/Cart/Items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ productID, quantité: 1 })
            })

            if (!response.ok) {
                setError('failed to add')
            }

            const cart = await response.json();
            if (!cart) {
                setError('failed to parse cart data')
            }

            const cartItemMapping = cart.items.map(({ product, quantité }) => ({ productid: product._id, title: product.title, image: product.image, quantité, unitPrice: product.unitPrice }))
            setCartItem([...cartItemMapping])
            setTotalAmount(cart.totalAmount)
        } catch (error) {
            console.error(error);

        }
    }
    return (
        <CartContext.Provider value={{ cartItem, totalAmount, setCartItem, setTotalAmount, addItemToCart }}>
            {children}
        </CartContext.Provider>

    )
}
CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartProvider;