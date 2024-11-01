import express from "express";
import { login, register } from "../services/userServices.js";

const router = express.Router()




router.post('/register',async(req,res)=>{
    const {firstname,lastname,email,password} = req.body;

    const result = await register({firstname,lastname,email,password})
    res.status(result.statuscode).send(result.data)
})

router.post('/login',async(req,res)=>{
    const {password,email} = req.body
    const {statuscode,data} = await login({password,email})
    res.status(statuscode).send(data)

})
export default router;