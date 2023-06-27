const client = require("../client")

async function createProduct({name, description, price, photourl, tags}){
    try{
        const {rows:[newPorduct]}= await client.query(`
            INSERT INTO products(name, description, price, photourl, tags)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *
        `,[name, description, price, photourl, tags])
        return newPorduct
    }catch(err){
        throw err;
    }

}

module.exports = {
    createProduct
}