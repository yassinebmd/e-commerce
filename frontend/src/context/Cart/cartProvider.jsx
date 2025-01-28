import PropTypes from 'prop-types';
import { CartContext } from './cartContext.jsx';
import { useEffect, useState } from 'react';
import { UseAuth } from '../auth/authContext.jsx';


export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [error, setError] = useState('')
    const { token } = UseAuth()

    useEffect(() => {
        const fetchCart = async () => {
            const response = await fetch("http://localhost:5001/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            console.log(data); 

            if (data.items && Array.isArray(data.items)) {
                const formattedCartItems = data.items.map((item) => ({
                    productid: item.product.$oid, // Ensure this is correctly mapped
                    quantité: item.quantité,
                    unitPrice: item.unitprice,
                    title: item.product.title,
                    image: item.product.image // Add more fields if necessary
                }));
                setCartItem(formattedCartItems);
                setTotalAmount(data.totalamont)

            }
        };

        fetchCart();
    }, [token]);








    const addItemToCart = async (productID) => {
        try {
            const response = await fetch(`http://localhost:5001/Cart/Items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ productID, quantité: 1 })
            })

            if (!response.ok) {
                return setError('failed to add')
            }

            const cart = await response.json();
            
            
            if (!cart) {
                return setError('failed to parse cart data')
            }

            const formattedCartItems = cart.items.map((item) => ({
                productid: item.product.$oid, 
                quantité: item.quantité,
                unitPrice: item.unitprice,
                title: item.product.title,
                image: item.product.image
            }));
            setCartItem([...formattedCartItems]);
            setTotalAmount(cart.totalamont)
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