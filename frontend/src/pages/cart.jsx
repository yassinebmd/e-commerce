import { Container, Typography, Box, ButtonGroup, Button } from "@mui/material";
import { UseCart } from "../context/Cart/cartContext.jsx";
import { useNavigate } from "react-router-dom";
export const Cart = () => {
    const { cartItem, totalAmount, updateitem, removeitem , clearitems} = UseCart();

    const handlQuantity = (productID, quantité) => {
        if (quantité <= 0) {
            return alert('quantity must be greater than 0');
        }
        updateitem(productID, quantité)
    }

    const handlremove = (productID) => {
        removeitem(productID)
    }

    const navigate = useNavigate();
    
    return (
        <Container fixed sx={{ mt: 2, width: '70%' }}>
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">My Cart</Typography>
                <Typography>
                    <Button onClick={() => clearitems()}>clear All</Button>

                </Typography>
            </Box>
            {cartItem.length > 0 ? (
                <>
                    {cartItem.map((item) => (
                        <Box
                            key={item.productID}
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: '13px',
                                p: 2,
                                mt: 2,
                            }}
                        >
                            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{ width: '70px', height: '70px' }}
                                />
                                <Box>
                                    <Typography variant="h5">{item.title}</Typography>
                                    <Typography>{item.quantité} X {item.unitPrice} MAD</Typography>
                                    <Button onClick={() => handlremove(item.productID.toString())}>Remove</Button>
                                </Box>
                            </Box>

                            <ButtonGroup variant="contained" aria-label="Basic button group">
                                <Button onClick={() => handlQuantity(item.productID.toString(), item.quantité + 1)}>+</Button>
                                <Button onClick={() => handlQuantity(item.productID.toString(), item.quantité - 1)}>-</Button>
                            </ButtonGroup>
                        </Box>
                    ))}

                    <Box sx={{ mt: 2 }} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                        <Typography variant="h6">Total: {totalAmount} MAD</Typography>
                        <Button variant="contained" onClick={()=>navigate('/checkout')}>Go to checkout</Button>
                    </Box>
                </>
            ) : (
                <Typography variant="h4">Your cart is empty.</Typography>
            )}
        </Container>
    );
};
