import {cartModel} from '../Models/cartModel.js';

const createCartFoeUser =async ({userId}) => {

    let cart = await cartModel.create({userId,totalamont:0});
    await cart.save();
    return cart;

}

export const getActiveCart = async({userId}) => {

    const cart =await cartModel.findOne({userId,status:"active"})

    if(!cart) {
        const cart = await createCartFoeUser({userId});
        return;
    }
    return cart;
}