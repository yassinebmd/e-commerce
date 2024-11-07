import express from "express";
import {getActiveCart} from '../services/cartServices.js'
import {validJWT} from '../middlewares/validateJWT.js'
import {addnewitems} from '../services/cartServices.js'
import {updateitem} from '../services/cartServices.js'
import {deletitem} from '../services/cartServices.js'
import {deleteall} from '../services/cartServices.js'
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

router.put('/items',validJWT,async(req,res)=>{
    const userId = req.user._id;
    const {productID,quantité} = req.body;
    const result = await updateitem({userId,productID,quantité})

    res.status(result.status).send(result.data)
}) 

router.delete('/items/:productid',validJWT,async(req,res)=>{
    const userId = req.user._id;
    const {productid} = req.params;
    const result = await deletitem({userId,productid})
    res.status(result.status).send(result.data)

})

router.delete('/',validJWT,async(req,res)=>{
    const userId = req.user._id;
    const result = await deleteall({userId})
    res.status(result.status).send(result.data)

})
export default router;