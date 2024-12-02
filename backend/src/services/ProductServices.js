import ProductModul from '../Models/productShema.js';

const getAllProducts = async() => {
    return await ProductModul.find();
}

export const seedProducts =async () => {
    try {
        const products = [
            {title:'dell laptob',image:'https://m.media-amazon.com/images/I/61h2kiuavTL._AC_SL1242_.jpg',price:5000,stock:20},
            {title:'dell laptob',image:'https://m.media-amazon.com/images/I/61h2kiuavTL._AC_SL1242_.jpg',price:5000,stock:20},
            {title:'dell laptob',image:'https://m.media-amazon.com/images/I/61h2kiuavTL._AC_SL1242_.jpg',price:5000,stock:20}
        ]
        
    
        const existPro = await getAllProducts()
        if(existPro.length===0){
            await ProductModul.insertMany(products)
        }
    } catch (error) {
        console.log('there something went wrong !');
        
    }
    
}