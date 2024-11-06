import express from "express";
import {getActiveCart} from '../services/cartServices.js'
import {validJWT} from '../middlewares/validateJWT.js'
import {addnewitems} from '../services/cartServices.js'
const router = express.Router();

router.get('/',validJWT,async(req,res)=>{
    //get userID from jwt after validation from middleware
    const userId = req.user._id
    
    const cart = await getActiveCart({userId})
    res.send(cart)
})

router.post('/items',validJWT,async(req,res)=>{
    const userId = req.user._id;
    const {productID,quantité} = req.body;
    const result = await addnewitems({userId,productID,quantité})

    res.status(result.status).send(result.data)
})
export default router;