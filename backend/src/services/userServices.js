import('dotenv/config')
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
    try {
        const findUser = await userModel.findOne({ email });
        if (!findUser) {
            return { data: 'Incorrect email or password', statuscode: 400 };
        }

        const matchingPsw = await bcrypt.compare(password, findUser.password);
        if (matchingPsw) {
            const token = gen_jwt({
                email,
                firstname: findUser.firstname,
                lastname: findUser.lastname,
            });
            return { data: { token }, statuscode: 200 };
        }

        return { data: 'Incorrect email or password', statuscode: 400 };
    } catch (error) {
        console.error("Login error:", error);
        return { data: 'An error occurred while logging in', statuscode: 500 };
    }
};

const gen_jwt = (data) => {
    try {
        return jwt.sign(data, process.env.JWT_SECRET);
    } catch (error) {
        console.error("JWT generation error:", error);
        throw new Error('JWT generation failed');
    }
};
