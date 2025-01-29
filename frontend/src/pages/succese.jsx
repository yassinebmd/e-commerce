import { Container, Typography,  Button } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            {/* Success Icon */}
            <CheckCircle sx={{ fontSize: 100, color: "green", mb: 2 }} />

            {/* Success Message */}
            <Typography variant="h4" fontWeight="bold">
                Thanks for your order.
            </Typography>

            <Typography variant="h6" color="textSecondary" mt={1}>
                We started processing it, and we will get back to you soon.
            </Typography>

            {/* Home Button */}
            <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() => navigate("/")}
            >
                GO TO HOME
            </Button>
        </Container>
    );
};

export default SuccessPage;
