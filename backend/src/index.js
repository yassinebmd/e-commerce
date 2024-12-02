import dotenv from 'dotenv'
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js"
import cartRouter from "./routers/cartRouter.js"
import {seedProducts} from './services/ProductServices.js';
dotenv.config();

import cors from 'cors'

const app = express()
const port = 5001

app.use(express.json())
 app.use(cors())

mongoose
    .connect(process.env.DATA_BASE_URL)
    .then(() => console.log('mooose connect'))
    .catch((err) => console.log('failed connect', err))

seedProducts();

app.use('/user',userRouter);
app.use('/products',productRouter)
app.use('/cart',cartRouter)



app.listen(port, () => {
    console.log('server is running',`at http://localhost:${port}`);

})