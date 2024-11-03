import express from 'express';
import ProductModul from '../Models/productShema.js'
const router = express.Router()

router.get('/',async(req,res)=>{
    const products = await ProductModul.find();
    res.send(products)
})


export default router;