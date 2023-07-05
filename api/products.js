const express = require("express")
const productsRouter = express.Router();
const jwt = require("jsonwebtoken")
productsRouter.use(express.json());

const {
    createProduct,
    getAllProducts,
    getAllProductByTag,
    getAllProductByName,
    updateProduct,
    deleteProduct
}= require("../db");


//================GET ALL PRODUCTS===============
productsRouter.get("/", async (req, res, next) => {
    try{
        const products = await getAllProducts();
        //console.log(products)
        res.send({
            products,
            message: "Products Retrieved"
        })
    }catch(err){
        console.error('ERROR GETTING ALL PRODUCTS!!!!', err);

    }
    next();
});

//================GET ALL PRODUCTS BY ID===============

productsRouter.get("/:tag", async (req, res, next) => {
    const {tag} = req.params;
    try{
        const products = await getAllProductByTag(tag);
        //console.log(products)
        res.send({
            products,
            message: "Product Founnd by ID"
        })
    }catch(err){
        console.error('ERROR GETTING ALL PRODUCTS BY TAG!!!!', err);

    }
    next();
});

//================GET PRODUCTS BY NAME===============

productsRouter.get("/:name", async (req, res, next) => {
    const {name} = req.params;
    try{
        const products = await getAllProductByName(name);
        //console.log(products)S
        res.send({
            products,
            message: "Product Found"
        })  
    }catch(err){
        console.error('ERROR GETTING ALL PRODUCTS BY NAME!!!!', err);

    }
    next();
});

//================CREATE PRODUCT===============

productsRouter.post("/createproduct", async (req, res, next) => {
    console.log("CREATE PRODUCT ROUTE")
    const {name, description, price, photourl, category} = req.body;
    try{
        const product = await createProduct({name, description, price, photourl, category});
        res.send({
            product,
            message: "Product Created"
        })
    }catch(err){
        console.error('ERROR CREATING PRODUCT!!!!', err);

    }
    next();
});

//================UPDATE PRODUCT===============

productsRouter.patch("/:productId", async (req, res, next) => {
    console.log("UPDATE PRODUCT ROUTE")
    
    const  {productId}= req.params;
    console.log(req.params);
    try {
     const {name, description, price, photourl, category } = req.body;
     const updateFields = {};
   
     if (productId) {
       updateFields.id = productId;
     }
     if (name) {
       updateFields.name = name;
     }
     if (description) {
       updateFields.description = description;
     }
     if (price) {
       updateFields.price = price;
     }
     if (photourl) {
       updateFields.photourl = photourl;
     }
     if (category) {
       updateFields.category = category;

     } 
       const updateAllProduct = await updateProduct(updateFields);
       res.send({
        updateAllProduct,
        message: "Product Updated"
       });
     
   } catch (err) {
        console.error('ERROR UPDATING PRODUCT!!!!', err);
   }
   });

//================DELETE PRODUCT===============

productsRouter.delete("/:productId", async (req, res, next) => {
    console.log("DELETE PRODUCT ROUTE")
    const {productId} = req.params;
    try{
        const product = await deleteProduct(productId);
        res.send({
            product,
            message: "Product Deleted"
        })
    }catch(err){
        console.error('ERROR DELETING PRODUCT!!!!', err);

    }
    next();
});




module.exports = productsRouter;