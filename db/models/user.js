// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt  = require("bcrypt")

// add your database adapter fns here

//==============CREATE USER================
async function createUser({username, password, email, isAdmin}){
  const SALT_COUNT =10;

  const hashedPassword = await bcrypt.hash(password, SALT_COUNT)

  try{
    const {rows:[user]}= await client.query(
    `INSERT INTO users(username, password, email, isAdmin)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (username) DO NOTHING
    RETURNING id, username, email, isAdmin;`
    , [username, password, email, isAdmin])

    return user
  }catch(err){
    console.error('ERROR CREATING USER!!!!', err);
  }
};

//==============GET ALL USERS================
async function getAllUsers() {
  try{
    const {rows: users} = await client.query(`
    SELECT *
    FROM users;
    `)
    return users
  }catch(err){
   console.error('ERROR GETTING ALL USERS!!!!', err);
  }
};

//==============GET USER================


async function getUser(user){
  const {username, password} = user;
  console.log(username, password)
  try{  
    const user =await getUserByUsername(username)
    console.log(user)

    // const hashedPassword = user.password
    // const passwordsMatch = await bcrypt.compare(password, hashedPassword)

    if(passwordsMatch){
      delete user.password
      return user
    }else{
      return null;
    }

  }catch(err){
    console.error('ERROR GETTING USER!!!!', err);
  }
};

//==============GET USER BY ID================
async function getUserById(userId) {
  try {
    const { rows: [ user ] } = await client.query(`
    SELECT *
    FROM users
    WHERE id = $1;
  `, [userId]);

  delete user.password;
  //console.log(result) 
    return user
  } catch (err) {
    console.error('ERROR Getting User by Id!!!',err);
      throw err;
  }
};

//==============GET USER BY USERNAME================
async function getUserByUsername(username){
  //console.log(username)
  try{
    const {rows:[user]}= await client.query(`
      SELECT *
      FROM users
      WHERE username = $1;
    `, [username]);
    return user;
  }catch(err){
   console.error('ERROR GETTING USER BY USERNAME!!!!', err);
  }
};

//==============DELETE USER================
async function deleteUser(id){
  try{
    const {rows: [user]} = await client.query(`
    DELETE FROM users
    WHERE id = $1
    RETURNING *;
    `, [id])
    return user
  }catch(err){
    console.error('ERROR DELETING USER!!!!', err);
  }
};


//==============EXPORTS================

module.exports = {
createUser,
getAllUsers,
getUser,
getUserById,
getUserByUsername,
deleteUser
};