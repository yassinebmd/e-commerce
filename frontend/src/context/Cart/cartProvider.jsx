import PropTypes from 'prop-types';
import { CartContext } from './cartContext.jsx';
import { useEffect, useState } from 'react';
import { UseAuth } from '../auth/authContext.jsx';


export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [, setError] = useState('')
    const { token } = UseAuth()

    useEffect(() => {
        const fetchCart = async () => {
            const response = await fetch("http://localhost:5001/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            console.log(data); 

            const formattedCartItems = data.items.map(({product,quantité}) => ({
                productID: product._id, 
                quantité,
                unitPrice: product.unitprice,
                title: product.title,
                image: product.image
            }));
                setCartItem(formattedCartItems);
                setTotalAmount(data.totalamont)

            
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

            const formattedCartItems = cart.items.map(({product,quantité}) => ({
                productID: product._id, 
                quantité,
                unitPrice: product.unitprice,
                title: product.title,
                image: product.image
            }));
            console.log(formattedCartItems);
            
            setCartItem([...formattedCartItems]);
            setTotalAmount(cart.totalamont)
        } catch (error) {
            console.error(error);

        }
    }

    const updateitem = async (productID, quantité) => {
        try {
            const response = await fetch(`http://localhost:5001/cart/items`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ productID, quantité }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update item');
            }
    
            const cart = await response.json();
            if (!cart) {
                throw new Error('Failed to parse cart data');
            }
    
            const formattedCartItems = cart.items.map(({ product, quantité }) => ({
                productID: product._id,
                quantité,
                unitPrice: product.unitprice,
                title: product.title,
                image: product.image,
            }));
    
            setCartItem(formattedCartItems);
            setTotalAmount(cart.totalamont);
        } catch (error) {
            console.error(error);
            setError('Failed to update item');
        }
    };
    return (
        <CartContext.Provider value={{ cartItem, totalAmount, setCartItem, setTotalAmount, addItemToCart , updateitem }}>
            {children}
        </CartContext.Provider>

    )
}
CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartProvider;