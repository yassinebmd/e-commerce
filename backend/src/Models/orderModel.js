import mongoose, { Schema } from "mongoose";

const orderitemschema = new Schema({
    productTitle:{type:String,required:true},
    productImage:{type:String,required:true},
    unitprice:{type:Number,required:true},
    quantité:{type:Number,required:true}
})

const orderschema = new Schema({
    orderItems : [orderitemschema],
    total : {type:Number,required:true},
    adress:{type:String,required:true},
    userId : {type:Schema.Types.ObjectId,ref:'user',required:true}

})

export const orderModel = mongoose.model('order',orderschema)