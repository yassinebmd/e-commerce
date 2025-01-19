import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UseAuth } from "../context/auth/authContext";

export const Cart = () => {
    const { token } = UseAuth();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            const response = await fetch(`http://localhost:5001/cart`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setCart(data);        console.log(data);

        };

        fetchCart();
        
    }, [token]);

    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h4">My Cart</Typography>
            
        </Container>
    );
};