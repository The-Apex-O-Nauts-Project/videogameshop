const client = require("../client")

//=======Create Product==========
async function createProduct({name, description, price, photourl, tags}){
    try{
        const {rows:[newPorduct]}= await client.query(`
            INSERT INTO products(name, description, price, photourl, tags)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *;
        `,[name, description, price, photourl, tags])
        return newPorduct
    }catch(err){
        throw err;
    }

}

//========Get All Products========
async function getAllProducts(){
    try{
        const {rows: products} = await client.query(`
        SELECT *
        FROM products 
        RETURNING *;
        `);
        return products
    }catch(err){
        console.error("There was an error getting all products",err)
        throw err;
    }
}

//=========Get All Products By Tag=========
async function getAllProductByTag({tags}){
    try{
        const {rows:productTag}= await client.query(`
        SELECT *
        FROM products
        WHERE ${tags} = ANY tags;
        `)
        return productTag
    }catch(err){
        console.error("There was an error at getAllProductByTag ", err)
        throw err
    }
}
//========Get A Product By Name========
async function getAllProductByName({name}){
    try{
        
    }catch(err){
        console.error("there was an error getAllProductByName", err)
        throw err
    }
}
//========Update A Product========

//=========Delete A Product========

module.exports = {
    createProduct,
    getAllProducts,
    getAllProductByTag,

}