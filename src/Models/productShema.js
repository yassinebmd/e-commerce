import mongoose, { Schema } from "mongoose";

const ProductShema = new Schema({
    title:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    stock:{type:Number,required:true,default:0}
});

const ProductModul = mongoose.model('Product',ProductShema)

export default ProductModul;