const client = require("../client")

//========Create A Product========
async function createProduct({name, description, price, photourl, category}){
    try{
        const {rows: [product]} = await client.query(`
        INSERT INTO products(name, description, price, photourl, category)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,[name, description, price, photourl, category])
        return product
    }catch(err){
        console.error("There was an error creating your product", err)
        throw err;
    }
};

//========Get All Products========
async function getAllProducts(){
    try{
        const {rows: products} = await client.query(`
        SELECT *
        FROM products;
        `);
        return products
    }catch(err){
        console.error("There was an error getting all products",err);
        throw err;
    }
}

//=========Get Products By Id=========
async function getAllProductByTag(id){
    try{
        const {rows:[productId]}= await client.query(`
        SELECT id, name, description
        FROM products
        WHERE id = $1;
        `,[id])
        return productId
    }catch(err){
        console.error("There was an error getting the product by id", err);
        throw err;
    }
}
//========Get A Product By Name========
async function getAllProductByName(name){
    try{
        const {rows: [ productName ]} = await client.query(`
        SELECT id, name, description
        FROM products
        WHERE name = $1;
        `, [name])
        return productName;
    }catch(err){
        console.error("there was an error getting your product by name", err)
        throw err
    }
}
//========Update A Product========

async function updateProduct({ id, ...fields }) {
    console.log(id, fields);
    const setString = Object.keys(fields).map(
      (key, index) => `"${key}"=$${index + 1}`
  ).join(',');
  
    try {
      if (setString.length > 0) {
     const { rows: [ product ] } = await client.query(`
    UPDATE products
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
  `, Object.values(fields)); 
  
    return product;
    }
     
    } catch (error) {
      console.error('ERROR Updating Product!!!',error);
        throw error;
    }
  };

//========Delete A Product========

async function deleteProduct(id){
    try{
        const {rows: [product]} = await client.query(`
        DELETE FROM products
        WHERE id = $1
        RETURNING *;
        `,[id])
        return product
    }catch(err){
        console.error("There was an error deleting your product", err)
        throw err;
    }
};




//=========Attach A Product To CartItem=============
async function attachAProductToCart(cartItems) {
    try {
      const { rows: cartItemsWithProducts } = await client.query(`
        SELECT products.*, 
          cartItem.id AS "cartItemId", 
          cartItem."productId",
          cartItem.quantity,
          cartItem."cartsId"
        FROM products
        JOIN cartItem ON products.id = cartItem."productId";
      `);
  
      cartItems.forEach((cartItem) => {
        cartItem.products = cartItemsWithProducts.filter(
          (product) => cartItem.id === product.productId
        );
      });
  
      return cartItems;
    } catch (err) {
      console.error("There was an error when joining", err);
      throw err;
    }
  };
  
//   attachAProductToCart()
//   console.log(attachAProductToCart)


module.exports = {
    createProduct,
    getAllProducts,
    getAllProductByTag,
    getAllProductByName,
    updateProduct, 
    deleteProduct,
    attachAProductToCart,

}