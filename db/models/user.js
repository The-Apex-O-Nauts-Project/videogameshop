// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt  = require("bcrypt")
// add your database adapter fns here

async function createUser({username, password, email, isAdmin}){
  const SALT_COUNT =10;

  const hashedPassword = await bcrypt.hash(password, SALT_COUNT)

  try{
    const {rows:[user]}= await client.query(`
    INSERT INTO users(username, password, email, isAdmin)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (username) DO NOTHING
    RETURNING id, username, email, isAdmin
    `, [username, hashedPassword, email, isAdmin])

    return user
  }catch(err){
    throw err
  }
}

async function getAllUsers() {
  try{
    const {rows: users} = await client.query(`
    SELECT *
    FROM users
    `)
    return users
  }catch(err){
    throw err
  }
}
async function getUser({username, password}){
  try{  
    const user =await getUserByUsername(username)

    const hashedPassword = user.password
    const passwordsMatch = await bcrypt.compare(password, hashedPassword)

    if(passwordsMatch){
      delete user.password
      return user
    }else{
      return null;
    }

  }catch(err){
    throw err
  }
}
async function getUserById(userId){
  try{
    const {row:[user]}= await client.query(`
      SELECT id, username
      FROM users
      WHERE id=${userId}

    `)
    if(!user){
      return null
    }
    return user;
  }catch(err){
    throw err
  }
}
async function getUserByUsername(username){
  try{
    const {rows:[user]}= await client.query(`
      SELECT *
      FROM users
      WHERE username = $1
    `, [username])
  }catch(err){
    throw err
  }
}

module.exports = {
createUser,
getAllUsers,
getUser,
getUserById,
getUserByUsername
};