const client = require('../client');

//==========Create A cartItem==============

async function createCartItem({cartOwner, productId, cartId, quantity}){
   try{
    const {rows: [cartItem]} = await client.query(`
    INSERT INTO cartItem(cartOwner, productId, cartId, quantity)
    VALUES($1, $2, $3, $4)
    RETURNING *;
    `)
    return cartItem;
   }catch(err){
    throw err;
   }
}

//========Get All CartItem by Id============



module.exports={
    createCartItem,
}