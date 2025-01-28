import { Container, Typography, Box } from "@mui/material";
import { UseCart } from "../context/Cart/cartContext";

export const Cart = () => {
    const { cartItem } = UseCart();

    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h4">My Cart</Typography>
            {cartItem.length > 0 ? (
                cartItem.map((item) => (
                    <Box key={item.productid}>
                        <Typography variant="body1">{item.title}</Typography>
                        <Typography variant="body2">Price: ${item.unitPrice}</Typography>
                        <Typography variant="body2">Quantity: {item.quantity}</Typography>
                    </Box>
                ))
            ) : (
                <Typography variant="body1">Your cart is empty.</Typography>
            )}
        </Container>
    );
};
