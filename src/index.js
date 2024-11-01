import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";

const app = express()
const port = 5001

app.use(express.json())
mongoose
    .connect('mongodb://localhost:27017/ecommerce')
    .then(() => console.log('mooose connect'))
    .catch((err) => console.log('failed connect', err))


app.use('/user',userRouter)

app.listen(port, () => {
    console.log('server is running',`at http://localhost:${port}`);

})