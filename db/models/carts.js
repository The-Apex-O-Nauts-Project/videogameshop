const client = require("../client")


//==================CREATE CART=================

  const createCartInventory = async (cartItem) => {
    const { quantity, total, cartUserId, productsId } = cartItem;
    try{
        const {rows: cartItem} = await client.query(`
        INSERT INTO cart (quantity, total, "cartUserId", "productsId")
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        ` ,[quantity, total, cartUserId, productsId]);
        
      console.log(cartItem);
        return cartItem;
    }catch (err) {
        console.log('ERROR CREATING Cart Item!!!!');
       console.error(err)
    }
   
};

//==================ADD ITEM TO CART=================

  const addItemToCart = async ( quantity, total, cartUserId,productsId) =>{
    try {
  await client.query(`
        INSERT INTO cart (quantity, total, "cartUserId", "productsId")
        VALUES ($1, $2, $3, $4)
        RETURNING*;
      `, [quantity,total,cartUserId,productsId]);
  
    } catch (err) {
    console.log('ERROR ADDING ITEM TO CART!!!!');
    console.error(err)
    }
  };

   //==================GET USER AND CART CHECK OUT ????=================

  const getUserAndCart = async (userId) => {
    try{
      const { rows } = await client.query(`
      SELECT users.id AS "CartOwner" , cart.id AS "Cart", cart.quantity AS " CartQuantity"
      FROM cart
      JOIN users ON cart."cartUserId" = users.Id;
      
      `);
    
      return rows;
    }catch(err){
      console.log('ERROR GETTING Users and cart!!!');
      console.error(err)
    }
  };
  
  //==================GET CART BY ID=================

  const getCartById = async (id) => {
    try{
      const { rows: [ cart ] } = await client.query(`
      SELECT *
      FROM cart
      WHERE id = $1;
    `, [id]);

      return cart;
    }catch(err){
      console.error('ERROR GETTING Cart by Id!!!');
      console.error(err)
    }
  };

  //==================GET CART BY USER ID=================

  const getCartByUserId = async (userId) => {
    try{
      const { rows: [ cart ] } = await client.query(`
      SELECT *
      FROM cart
      WHERE "cartUserId" = $1;
    `, [userId]);

      return cart;
    }catch(ex){
      console.error('ERROR GETTING Cart by User Id!!!');
     console.error(err);
    }   
  };

  //==================GET ALL CARTS=======================

  const getAllCarts = async () => {
    try{
      const { rows: [ cart ] } = await client.query(`
      SELECT *
      FROM cart;
    `);
    
      return cart;
    }catch(err){
      console.error('ERROR GETTING All Carts!!!');
      console.error(err);
    }
  };
  //===================GET CART USER BY NAME=================
  
  const getCartUserByName = async (name) => {
    try{
      const { rows: [ cart ] } = await client.query(`
      SELECT *
      FROM cart
      WHERE "cartUserId" = $1;
    `, [name]);

      return cart;
    }catch(err){
      console.error('ERROR GETTING Cart by User Id!!!');
      console.error(err);
    }
  };

  //==================DELETE CART BY USER ID=================

  const deleteCartByUserId = async (userId) => {
    try{
      const { rows: [ cart ] } = await client.query(`
      DELETE *
      FROM cart
      WHERE "cartUserId" = $1;
    `, [userId]);

    return cart;
      
      return cart;
    }catch(err){
      console.error('ERROR DELETING Cart by User Id!!!');
      console.error(err);
    }
  };

  //==================UPDATE CART=================

  const updateCart = async (id, quantity, total, cartUserId, productsId) => {
    try{
      const { rows: [ cart ] } = await client.query(`
      UPDATE cart
      SET quantity = $1, total = $2, "cartUserId" = $3, "productsId" = $4
      WHERE id = $5
      RETURNING *;
    `, [id, quantity, total, cartUserId, productsId]);
      
      return cart;
    }catch(ex){
      console.error('ERROR UPDATING Cart!!!');
      console.error(err);
    }
  };






      
      

//==================EXPORTS=================
  
module.exports ={
   addItemToCart,
    addItemToCart,
    createCartInventory,
    getUserAndCart,
    getCartById,
    getCartByUserId,
    getAllCarts,
    getCartUserByName,
    createCartInventory,
    deleteCartByUserId,
    updateCart
};