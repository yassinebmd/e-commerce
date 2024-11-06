import express from "express";
import {getActiveCart} from '../services/cartServices.js'
import {validJWT} from '../middlewares/validateJWT.js'
const router = express.Router();

router.get('/',validJWT,async(req,res)=>{
    const userId = req.user._id
    //get userID from jwt after validation from middleware
    const cart = await getActiveCart({userId})
    res.send(cart)
})
export default router;