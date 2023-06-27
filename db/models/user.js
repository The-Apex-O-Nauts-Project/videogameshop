// grab our db client connection to use with our adapters
const client = require('../client');

// add your database adapter fns here

async function createUser({username, password, email}){

  try{
    const {rows:[user]}= await client.query(`
    INSERT INTO users(username, password, email)
    VALUES ($1, $2, $3)
    ON CONFLICT (username) DO NOTHING
    RETURNING id, username, email
    `, [username, password, email])

    return user
  }catch(err){
    throw err
  }
}

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
}

module.exports = {
createUser,
getAllUsers,
};