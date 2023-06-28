const client = require("../client")

async function createCartItem({ productId, quantity, cartsId }) {
    try {
      const { rows: [newCartItem] } = await client.query(`
        INSERT INTO cartItem("productId", quantity, "cartsId")
        VALUES($1, $2, $3)
        RETURNING *        
      `, [productId, quantity, cartsId]);
  
      return newCartItem;
    } catch (err) {
      throw err;
    }
  }
  

module.exports = {
    createCartItem,
}