import { cartModel } from '../Models/cartModel.js';
import { orderModel } from '../Models/orderModel.js';
import ProductModul from '../Models/productShema.js';

const createCartFoeUser = async ({ userId }) => {
    let cart = await cartModel.create({ userId, totalamont: 0 });
    await cart.save();
    return cart; // Correct return of the created cart instance
};

export const getActiveCart = async ({ userId, populatProduct }) => {
    let cart ;
    if(populatProduct){
       cart= await cartModel.findOne({ userId, status: "active" }).populate('items.product');
    }else{
       cart= await cartModel.findOne({ userId, status: "active" });
    }

    if (!cart) {
        cart = await createCartFoeUser({ userId });
    }
    return cart;
};

export const addnewitems = async ({ userId, productID, quantité }) => {
    const cart = await getActiveCart({ userId });
    const existitem = cart.items.find((p) => p.product.toString() === productID);

    if (existitem) {
        return { data: 'Item already exists!', status: 403 };
    }

    const product = await ProductModul.findById(productID);
    if (!product) {
        return { data: 'Invalid product', status: 403 };
    }
    if (product.stock < quantité) {
        return { data: 'Low stock for item', status: 400 };
    }

    cart.items.push({ product: productID, quantité, unitprice: product.price });
    cart.totalamont += product.price * quantité;

    await cart.save();
    return { data: await getActiveCart({userId,populatProduct:true}), status: 200 };
};

export const updateitem = async ({ userId, productID, quantité }) => {
    const cart = await getActiveCart({ userId });
    const existitem = cart.items.find((p) => p.product.toString() === productID.toString());

    if (!existitem) {
        return { data: 'The product does not exist', status: 400 };
    }

    const product = await ProductModul.findById(productID);
    if (!product) {
        return { data: 'Invalid product', status: 403 };
    }
    if (product.stock < quantité) {
        return { data: 'Low stock for item', status: 400 };
    }

    const othercarts = cart.items.filter((p) => p.product.toString() !== productID.toString());
    let total = othercarts.reduce((sum, itm) => {
        sum += itm.quantité * itm.unitprice;
        return sum;
    }, 0);

    existitem.quantité = quantité;
    total += existitem.quantité * existitem.unitprice;

    cart.totalamont = total;

     await cart.save();
    return { data:await  getActiveCart({userId,populatProduct:true}), status: 200 };
};

export const deletitem = async ({ userId, productid }) => {
    const cart = await getActiveCart({ userId });
    const existitem = cart.items.find((p) => p.product.toString() === productid);

    if (!existitem) {
        return { data: 'The product does not exist', status: 400 };
    };

    const othercarts = cart.items.filter((p) => p.product.toString() !== productid);
    let total = othercarts.reduce((sum, itm) => {
        sum += itm.quantité * itm.unitprice;
        return sum;
    }, 0);

    cart.items = othercarts;
    cart.totalamont = total;

    await cart.save();
    return { data: updatedcart, status: 200 };
};

export const deleteall = async ({ userId }) => {
    const cart = await getActiveCart({ userId });
    cart.items = [];
    cart.totalamont = 0;
    const updatecart = await cart.save();
    return { data: getActiveCart({userId,populatProduct:true}), status: 200 };
};

export const checkout = async ({ userId, adress }) => {
    if (!adress) {
        return { data: 'Please enter the address', status: 400 };
    }

    const cart = await getActiveCart({ userId });

    if (!cart || !cart.items || cart.items.length === 0) {
        console.log('No items found in cart or cart not found'); // Debug log
        return { data: 'No items found in cart or cart not found', status: 400 };
    }

    const orderItems = [];

    // Log the cart items for debugging
    console.log('Cart Items:', cart.items);

    // Loop through cart items and retrieve product details
    for (const item of cart.items) {
        const product = await ProductModul.findById(item.product);
        if (!product) {
            console.log(`Product not found: ${item.product}`); // Debug log
            return { data: `Product with ID ${item.product} not found`, status: 400 };
        }

        const orderItem = {
            productTitle: product.title,
            productImage: product.image,
            unitprice: item.unitprice,
            quantité: item.quantité,
        };
        orderItems.push(orderItem);
    }

    if (orderItems.length === 0) {
        console.log('Order items are empty'); // Debug log
        return { data: 'No valid items found to create order', status: 400 };
    }
    // Create the order
    const order = await orderModel.create({
        orderItems,
        total: cart.totalamont,
        adress,
        userId,
    });

    cart.status = 'completed';
    await cart.save();

    return { data: order, status: 200 };
};

