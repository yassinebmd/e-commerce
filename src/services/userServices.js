import { userModel } from "../Models/userShema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';




export const register = async ({ firstname, lastname, email, password }) => {
    const findUser = await userModel.findOne({ email })
    if (findUser) {
        return { data: 'you already exist ! ', statuscode: 400 }
    }

    

    const hashingpws = await bcrypt.hash(password, 10);
    const newUser = await userModel({ firstname, lastname, email, password: hashingpws })
    await newUser.save()
    return { data: gen_jwt({email,firstname,lastname}), statuscode: 200 }
}





export const login = async ({ password, email }) => {
    const findUser = await userModel.findOne({ email })
    if (!findUser) {
        return { data: 'incorrect email or password', statuscode: 400 }
    }
    const matchingPsw = await bcrypt.compare(password, findUser.password)
    if (matchingPsw) {
        return { data: gen_jwt({email,firstname:findUser.firstname,lastname:findUser.lastname}), statuscode: 200 }
    }
    return { data: 'incorrect email or password', statuscode: 400 }

}


const gen_jwt = (data) => {
    return jwt.sign(data,'eajGxWMOxdigKQLKdk6SVCQIFb7ywziw')
}