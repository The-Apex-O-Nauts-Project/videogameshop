const {
  client,
  createUser,
  createProduct,
} = require('./');
//const{createUser} = require("./models/user")
async function dropTables() {
  try {
    client.connect();
    console.log('Dropping All Tables...');

    await client.query(`
      DROP TABLE IF EXISTS cartItem;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error('ERROR Dropping Tables!!!', error);
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`

        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        isAdmin BOOLEAN
        );
      
        CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price INTEGER,
        photourl TEXT NOT NULL,
        tags TEXT NOT NULL
        );
        
        CREATE TABLE carts (
        id SERIAL PRIMARY KEY,
        "usersId" INTEGER REFERENCES users(id),
        total INTEGER
        );
     
        CREATE TABLE cartItem (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "cartsId" INTEGER REFERENCES carts(id),
        quantity INTEGER,
        UNIQUE ("cartsId", "productId")
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
      {username:"albert", password:"bertie99", email:"bert@gmail.com"},
      { username: "sandra", password: "sandra123", email:"sandra@gmail.com" },
      { username: "glamgal", password: "glamgal123", email:"glamgal@gmail.com"},
    ]
    const users= await Promise.all(usersToCreate.map(createUser))

    console.log("Users Create:")
    console.log(users)

  } catch (error) {
    console.log("Error creating users!")
    throw error;
  }
}

async function createInitialProducts(){
  try{
  const productsToCreate=[
    {name:"Destiny 2", 
    description:"Really fun game you should play", 
    price: 0, 
    photourl:"", 
    tags:["Shooter", "Action"]},
    {name:"Mass-Effect", 
      description:"Really fun game you should play", 
      price: 60,
      photourl:"",
      tags:["Action", "Shooter"]},
    {name:"TitanFall 2", 
      description:"Really fun game you should play ", 
      price: 60, 
      photourl:"", 
      tags:["Action","Shooter"]}

  ]
  const products = await Promise.all(productsToCreate.map(createProduct))
  
  console.log("Products created:")
  console.log(products)
  }catch(error){
    throw error
  }
}
async function createInitialCarts(){
  try{

  }catch(error){
    throw error
  }
}
async function createInitialCartItem(){
  try{

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
    // await createInitialCarts()
    // await createInitialCartItem()
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error
  }
}
module.exports = {
  rebuildDB,
  dropTables,
  createTables,
}