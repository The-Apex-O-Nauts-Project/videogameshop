const client = require("../client")

async function createCart({ userId, total }) {
    try {
      const { rows: [newCart] } = await client.query(`
        INSERT INTO carts("usersId", total)
        VALUES($1, $2)
        RETURNING *
      `, [userId, total]);
  
      return newCart;
    } catch (err) {
      throw err;
    }
  }
  

module.exports ={
    createCart
}