const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function dropTables() {
  try {
    client.connect();
    console.log('Dropping All Tables...');

    await client.query(`
        DROP TABLE IF EXISTS cart_item;
        DROP TABLE IF EXISTS carts;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
    `);
    // drop tables in correct order
    //add in CASCADE if trouble

    // build tables in correct order
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error('ERROR Dropping Tables!!!',error);
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


async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
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
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error
  }
}
