import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useRef, useState } from "react"
import { UseAuth } from "../context/auth/authContext"
export const Register = () => {

    const firstnameRef = useRef(null)
    const lastnameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [error, setError] = useState('')
    const {login} = UseAuth(); 

    const onSubmit = async () => {

        const firstname = firstnameRef.current.value;
        const lastname = lastnameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if(!firstname || !lastname || !email || !password){
            setError('please fill all fields !')
            return;
        }
            

        //create user;

        const response = await fetch(`http://localhost:5001/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname, lastname, email, password })
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
            setError('you already exist !')
            return;
        }
        login(email , token)

        console.log(token);

    }
    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, flexDirection: 'column' }}>
                <Typography variant="h5">register new account</Typography>
                <Box sx={{ display: 'flex', mt: 3, flexDirection: 'column ', gap: 2 }}>
                    <TextField inputRef={firstnameRef} label='first name' name="fullName" />
                    <TextField inputRef={lastnameRef} label='last name' name="lastName" />
                    <TextField inputRef={emailRef} label='email' name="email" />
                    <TextField inputRef={passwordRef} type="password" label='password' name="password " />
                    <Button onClick={onSubmit} variant="contained">register</Button>
                    {error && <Typography color="error">{error}</Typography>}
                </Box>
            </Box>

        </Container>
    )
}  