import express from "express";
import {getActiveCart} from '../services/cartServices.js'
import {validJWT} from '../middlewares/validateJWT.js'
import {addnewitems} from '../services/cartServices.js'
import {updateitem} from '../services/cartServices.js'
import {deletitem} from '../services/cartServices.js'
import {deleteall} from '../services/cartServices.js'
import {checkout} from '../services/cartServices.js'
const router = express.Router();

router.get('/',validJWT,async(req,res)=>{
    try {
    //get userID from jwt after validation from middleware
    const userId = req.user._id
    
    const cart = await getActiveCart({userId,populatProduct:true})
    res.send(cart)
    } catch (error) {
        res.status(500).send('there something went wrong !')
    }
    
})

router.post('/items',validJWT,async(req,res)=>{
    try {
        const userId = req.user._id;
        const {productID,quantité} = req.body;
        const result = await addnewitems({userId,productID,quantité})

        res.status(result.status).send(result.data)
    } catch (error) {
        res.status(500).send('there something went wrong !')

    }
    
})

router.put('/items',validJWT,async(req,res)=>{
    try {
        const userId = req.user._id;
    const {productID,quantité} = req.body;
    const result = await updateitem({userId,productID,quantité})

    res.status(result.status).send(result.data)
    } catch (error) {
        res.status(500).send('there something went wrong !')

    }
    
}) 

router.delete('/items/:productid',validJWT,async(req,res)=>{
    try {
        const userId = req.user._id;
    const {productid} = req.params;
    const result = await deletitem({userId,productid})
    res.status(result.status).json(result.data)
    } catch (error) {
        res.status(500).send('there something went wrong !')

    }
    

})

router.delete('/',validJWT,async(req,res)=>{
    try {
        const userId = req.user._id;
        const result = await deleteall({userId})
        res.status(result.status).send(result.data)
    } catch (error) {
        res.status(500).send('there something went wrong !')

    }
   

})



router.post('/checkout',validJWT,async(req,res)=>{
    try {
        const userId = req.user._id;
    const {adress} = req.body;
    const result = await checkout({userId,adress});
    res.status(result.status).send(result.data);
    } catch (error) {
        res.status(500).send('there something went wrong !')

    }
    

})
export default router;