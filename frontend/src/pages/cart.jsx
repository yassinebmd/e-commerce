import { Container, Typography, Box, ButtonGroup, Button } from "@mui/material";
import { UseCart } from "../context/Cart/cartContext.jsx";

export const Cart = () => {
    const { cartItem, totalAmount ,updateitem} = UseCart();

    const  handlQuantity = (productID,quantité) => {
        if(quantité <= 0){
            return alert('quantity must be greater than 0');
        }
        updateitem(productID,quantité)
    }

    return (
        <Container fixed sx={{ mt: 2, width: '70%' }}>
            <Typography variant="h4">My Cart</Typography>
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
                                    <Button>Remove</Button>
                                </Box>
                            </Box>

                            <ButtonGroup variant="contained" aria-label="Basic button group">
                                <Button onClick={()=>handlQuantity(item.productID.toString(),item.quantité +1)}>+</Button>
                                <Button onClick={()=>handlQuantity(item.productID.toString(),item.quantité -1)}>-</Button>
                            </ButtonGroup>
                        </Box>
                    ))}

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">Total: {totalAmount} MAD</Typography>
                    </Box>
                </>
            ) : (
                <Typography variant="h4">Your cart is empty.</Typography>
            )}
        </Container>
    );
};
