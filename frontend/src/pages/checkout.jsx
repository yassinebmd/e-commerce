import { Container, Typography, Box, Button, TextField } from "@mui/material";
import { useRef } from "react";
import { UseCart } from "../context/Cart/cartContext.jsx";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../context/auth/authContext.jsx";
export const Checkout = () => {
    const { cartItem, totalAmount } = UseCart();
    const adressRef = useRef();
    const navigate = useNavigate();
    const {token} = UseAuth('token');

    const handelConfirm = async () => {
        const adress = adressRef.current.value;
        if (!adress) {return};
        const response = await fetch(`http://localhost:5001/cart/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ adress })
        });
       if(response.ok){
                navigate('/Succece')

       }
    }
    return (
        <Container fixed sx={{ width: '70%' }} display="flex" flexDirection="column" gap={2}>
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Checkout</Typography>

            </Box>
            <TextField inputRef={adressRef} label='adress' name="adress" fullWidth />

            {cartItem.length > 0 ? (
                <Box
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: '13px',
                        p: 2,
                        mt: 2,
                    }}
                    gap={2}
                    width="100%"
                >
                    {cartItem.map((item) => (
                        <Box
                            key={item.productID}
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                        >
                            <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="space-between"
                                width="100%"
                            >
                                {/* Left Side: Image & Product Name */}
                                <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{ width: '70px', height: '70px' }}
                                    />
                                    <Typography variant="h5">{item.title}</Typography>
                                </Box>

                                {/* Right Side: Quantity & Price */}
                                <Typography variant="h6">
                                    {item.quantité} X {item.unitPrice} MAD
                                </Typography>
                            </Box>

                        </Box>
                    ))}

                    <Box sx={{ mt: 2 }} display="flex" flexDirection="row" justifyContent="space-between">
                        <Typography variant="h5">Total: {totalAmount} MAD</Typography>
                        <Button variant="contained" onClick={handelConfirm}>Pay now</Button>
                    </Box>
                </Box>
            ) : null}
        </Container>
    );
};
