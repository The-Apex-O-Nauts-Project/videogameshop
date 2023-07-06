


const {
  client,
  getUser,
  getUserById,
  getAllUsers,
  createUser,
  createProduct,
  addItemToCart,
  getUserAndCart,
  createCartInventory,
  getAllProductByTag,
  getAllProductByName,
  createCartItem

} = require('./');

async function dropTables() {
  try {
    client.connect();
    console.log('Dropping All Tables...');

    await client.query(`
      DROP TABLE IF EXISTS cartItem;
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error('ERROR Dropping Tables!!!', error);
    throw error;
  }
};

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`

        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE ,
        isAdmin BOOLEAN
        );
      
        CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price INTEGER,
        photourl TEXT NOT NULL,
        category TEXT NOT NULL
        );
        
        CREATE TABLE cart (
        id SERIAL PRIMARY KEY,
         quantity INTEGER,
         total INTEGER,
        "cartUserId" INTEGER REFERENCES users(id),
        "productsId" INTEGER REFERENCES products(id)
        );
     
        CREATE TABLE cartItem (
        id SERIAL PRIMARY KEY,
        "cartOwnerId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        "cartId" INTEGER REFERENCES cart(id),
        quantity INTEGER,
        UNIQUE ("cartOwnerId","cartId", "productId")
        );  
    `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("ERROR Building Tables!!!",error);
    throw error;
}
};


async function createInitialUsers() {
  try {
    const usersToCreate =[
      {username:"albert", password:"bertie99", 
      email:"bert@gmail.com", isAdmin: true},
      { username: "sandra", password: "sandra123", 
      email:"sandra@gmail.com", isAdmin: true },
      { username: "glamgal", password: "glamgal123", 
      email:"glamgal@gmail.com", isAdmin: false},
    ]
    const users= await Promise.all(usersToCreate.map(createUser))

    console.log("Users Create:")
    console.log(users)

  } catch (error) {
    console.log("Error creating users!")
    throw error;
  }
};

async function createInitialProducts(){
  try{
  const productsToCreate=[
    {name:"Destiny 2", 
    description:"Really fun game you should play", 
    price: 0, 
    photourl:"dsfsgadf", 
    category:["Action"]},
    {name:"Mass-Effect", 
      description:"Really fun game you should play", 
      price: 60,
      photourl:"sadfasf",
      category:[ "Shooter"]},
    {name:"TitanFall 2", 
      description:"Really fun game you should play ", 
      price: 60, 
      photourl:"adfasf", 
      category:["Shooter"]}

  ]
  const products = await Promise.all(productsToCreate.map(createProduct))
  
  console.log("Products created:")
  console.log(products)
  }catch(error){
    throw error
  }
};
async function createInitialCarts(){
  try{
    const cartsToCreate=[
      {quantity: 2, total: 120, userId: 1, productId: 1},
      {quantity: 5, total: 14, userId: 1, productId: 3},
      
      
    ]
    const carts = await Promise.all(cartsToCreate.map(createCartInventory))

    console.log("Cart created:") 
    console.log(carts)
  }catch(error){
    throw error
  }
};
async function createInitialCartItem(){
  try{
    const cartItemToCreate = [
      {cartOwnerId: 1, product: 1, quantity: 2, cartId: 1},
      {cartOwnerId: 2, productId: 2, quantity: 1, cartId: 2},
      {cartOwnerId: 3, productId: 3, quantity: 1, cartId: 3}
    ]
    const cartItem = await Promise.all(cartItemToCreate.map(createCartInventory))
    console.log("Cart Item created:")
    console.log(cartItem)
  }catch(error){
    throw error
  }
}

async function rebuildDB() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialProducts()
    await createInitialCarts()
    await createInitialCartItem()


   await addItemToCart(1,3,2,2)
    await addItemToCart(3,4,1,3)
    await addItemToCart(1,3,2,1)
    await addItemToCart(1,4,2,1)
    await addItemToCart(1,3,2,2)

    const cartUser = await getUserAndCart();
    console.log("cartuser", cartUser)

    const getAUSER = await getAllUsers();
    console.log("getAUSER", getAUSER);

    const getAUSERBYID = await getUserById(1);
    console.log("getAUSERBYID", getAUSERBYID);

    const getProdId = await getAllProductByTag(1);
    console.log("getProdId", getProdId);

    const getProdName = await getAllProductByName("Destiny 2");
    console.log("getProdName", getProdName);



  } catch (error) {
    console.log("Error during rebuildDB")
    throw error
  }
};
module.exports = {
  rebuildDB,
  dropTables,
  createTables,
  client
};
