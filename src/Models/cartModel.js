import mongoose, { Schema } from "mongoose";

const statusenum = ['active','complate'];

const cartItemSchema = new Schema({
    product : {type:Schema.Types.ObjectId, ref:'Product',required:true},
    quantité : {type:Number,required:true,default:1},
    unitprice : {type:Number,required:true}
})


const cartSchema = new Schema({
    userId : {type:Schema.Types.ObjectId,ref:'user',required:true},
    items : [cartItemSchema],
    totalamont : {type:Number,required:true},
    status : {type:String,enum:statusenum,default:"active"}
})


export const cartModel = mongoose.model('cart',cartSchema);