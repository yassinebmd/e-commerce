import jwt from "jsonwebtoken";
import('dotenv/config')
import { userModel } from "../Models/userShema.js";

export const validJWT = (req,res,next) => {
    const authorizationheader = req.get('authorization');
    if(!authorizationheader) {
        res.status(401).send('authorization header not found')
        return
    }

    const token = authorizationheader.split(" ")[1];

    if(!token) {
        res.status(403).send('empty token !!') 
        return;
    }

    jwt.verify(token,process.env.JWT_SECRET,async(err,payload)=>{
        if(err) {
            res.status(403).send('invalid token !')
        }
        if(!payload) {
            res.status(403).send('empty payload !!')
        }
        const user = await userModel.findOne({email:payload.email});
        req.user=user;
        
        next();
    })
}