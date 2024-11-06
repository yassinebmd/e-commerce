import {cartModel} from '../Models/cartModel.js';
import ProductModul from '../Models/productShema.js'
const createCartFoeUser =async ({userId}) => {

    let cart = await cartModel.create({userId,totalamont:0});
    await cart.save();
    return cart;

}

export const getActiveCart = async({userId}) => {

    const cart = await cartModel.findOne({userId,status:"active"})

    if(!cart) {
        const cart = await createCartFoeUser({userId});
        return;
    }
    return cart;
}

export const addnewitems = async({userId,productID,quantité}) => {
    const cart = await getActiveCart({userId})
    const existitem = cart.items.find((p)=>p.product.toString() === productID)

    if(existitem) {
        return {data:'item already exist!',status:403}
    }

    const product = await ProductModul.findById(productID)
    if(!product) {
        return {data:'invalid product',status:403}
    }
    if(product.stock < quantité) {
        return {data:'lo stock for item',status:400}
    }

    cart.items.push({product:productID,quantité,unitprice:product.price})

    cart.totalamont+=product.price * quantité;

    const updatecart =await cart.save()
    return {data:updatecart,status:200}
}