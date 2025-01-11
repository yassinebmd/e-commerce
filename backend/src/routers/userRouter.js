import express from "express";
import { login, register } from "../services/userServices.js";

const router = express.Router()




router.post('/register',async(req,res)=>{
    try {
        const {firstname,lastname,email,password} = req.body;

    const result = await register({firstname,lastname,email,password})
    res.status(result.statuscode).json(result.data)
    } catch (error) {
        res.status(500).send('there something went wrong !')

    } 
})

router.post('/login',async(req,res)=>{
    try {
        const {password,email} = req.body
    const {statuscode,data} = await login({password,email})
    res.status(statuscode).send(data)
    } catch (error) {
        res.status(500).send('there something went wrong !')

    }
    

});



export default router;



