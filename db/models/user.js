// grab our db client connection to use with our adapters
const client = require('../client');

// add your database adapter fns here

async function createUser({username, password, email, isAdmin}){

  try{
    const {rows:[user]}= await client.query(`
    INSERT INTO users(username, password, email, isAdmin)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (username) DO NOTHING
    RETURNING id, username, email, isAdmin
    `, [username, password, email, isAdmin])

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