


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
  getAllProductById,
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
      {username:"Admin", password:"Admin1234", 
      email:"Admin@gmail.com", isAdmin: true},
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
    description:"From the makers of the acclaimed hit game Destiny, comes the much-anticipated FPS sequel that takes you on an epic journey across the solar system.", 
    price: 0, 
    photourl:"https://assets-prd.ignimgs.com/2023/05/23/destiny2-seasondeep-1684857847531.jpg?width=300&crop=1%3A1%2Csmart", 
    category:["Shooter"]},
    {name:"Mass-Effect", 
      description:"RPG set 200 years in the future in an epic universe, in a vast galactic community in danger of being conquered by a legendary agent gone rogue.", 
      price: 25,
      photourl:"https://assets-prd.ignimgs.com/2021/12/09/masseffect-1639016658616.jpg?width=300&crop=1%3A1%2Csmart",
      category:[ "Rpg"]},
    {name:"TitanFall 2", 
      description:"Bring down the sky yet again in the fast-paced warfare of the sequel to Titanfall, featuring multiplayer and for the first time a single-player campaign that puts you in the shoes of soldier Jack Cooper, accompanied by a sentient robot companion", 
      price: 20, 
      photourl:"https://assets2.ignimgs.com/2016/09/23/titanfall-2-buttonjpg-f9a5df.jpg?width=300&crop=1%3A1%2Csmart", 
      category:["Shooter"]},
      {name:"Star Wars Jedi: Survivor", 
        description:"Lost Jedi Padawan Cal Kestis returns in Star Wars Jedi: Survivor, a third person, narrative-driven action-adventure game which picks up five years after the events of Star Wars Jedi: Fallen Order.", 
        price: 60, 
        photourl:"https://assets-prd.ignimgs.com/2022/12/05/star-wars-jedi-survivor-button-02a-1670263740893.jpg?width=300&crop=1%3A1%2Csmart", 
        category:["Action"]},
    {name:"Fallout 4", 
      description:"Welcome to the world of Fallout 4, the ambitious fourth game in the apocalyptic RPG saga. Only you can rebuild and determine the fate of the Wasteland. Do whatever you want in a massive open world with hundreds of locations, characters, and quests.", 
      price: 40, 
      photourl:"https://assets-prd.ignimgs.com/2021/12/07/fallout4-1638841806342.png?width=300&crop=1%3A1%2Csmart", 
      category:["Action"]},
    {name:"Fifa 23", 
      description:"FIFA 23 brings even more of the action and realism of football to the pitch in The World’s Game, with advanced HyperMotion2 Technology for true true football animation, men’s and women’s FIFA World Cup tourmanents, and new FUT Moments and a revamped Chemistry system in FIFA Ultimate Team.", 
      price: 45, 
      photourl:"https://assets-prd.ignimgs.com/2022/07/19/fifa-23-button-02-1658265594101.jpg?width=300&crop=1%3A1%2Csmart", 
      category:["Sports"]},
    {name:"CyberPunk 2077", 
    description:"Cyberpunk 2077 is a non-linear sci-fi RPG based on renowned pen-and-paper-RPG designer Mike Pondsmith's Cyberpunk system and created by CD Projekt, the acclaimed development group behind The Witcher.", 
    price: 45, 
    photourl:"https://assets-prd.ignimgs.com/2020/07/16/cyberpunk-2077-button-fin-1594877291453.jpg?width=300&crop=1%3A1%2Csmart", 
    category:["Rpg"]},

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

    const getProdId = await getAllProductById(1);
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
