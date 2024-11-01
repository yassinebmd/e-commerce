import mongoose, { Schema } from "mongoose";
const studentShema  = new Schema({
    firstname:{type:String, required:true},
    lastname:{type:String ,required:true},
    email:{type:String ,required:true},
    password:{type:String ,required:true}
    
})

export const studentModel = mongoose.model('user',studentShema)