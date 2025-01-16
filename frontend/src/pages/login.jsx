import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useRef, useState } from "react"
import { UseAuth } from "../context/auth/authContext"
import { useNavigate } from "react-router-dom"

export const Login = () => {

    
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [error, setError] = useState('')
    const {login} = UseAuth(); 

    const navigate = useNavigate();

    const onSubmit = async () => {

        
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if(!email || !password){
            setError('please fill all fields !')
            return;
        }
            

        //create user;

        const response = await fetch(`http://localhost:5001/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  email, password })
        })

        const contentType = response.headers.get("Content-Type");
        let token;

        if (contentType && contentType.includes("application/json")) {
            token = await response.json(); // Parse JSON
        } else {
            token = await response.text(); // Handle plain text or token
            console.warn("Response is not JSON:", token);
        }
        if (!response.ok) {
            setError('you have to register !')
            return;
        }
        login(email , token)
         
        navigate('/');


    }
    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, flexDirection: 'column' }}>
                <Typography variant="h5">login to account</Typography>
                <Box sx={{ display: 'flex', mt: 3, flexDirection: 'column ', gap: 2 }}>
                    <TextField inputRef={emailRef} label='email' name="email" />
                    <TextField inputRef={passwordRef} type="password" label='password' name="password " />
                    <Button onClick={onSubmit} variant="contained">login</Button>
                    {error && <Typography color="error">{error}</Typography>}
                </Box>
            </Box>

        </Container>
    )
}  