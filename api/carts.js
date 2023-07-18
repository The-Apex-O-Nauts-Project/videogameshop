const express = require("express");
const cartsRouter = express.Router();
const jwt = require("jsonwebtoken");

const {
        getCartById,
        getAllCarts,
        getCartByUserId,
        createCartInventory,
        addItemToCart,
        getUserAndCart,
        deleteCartByUserId,
        deleteCart,
        
     } = require("../db");

cartsRouter.use(express.json());

//================GET ALL CARTS===============
cartsRouter.get("/", async (req, res, next) => {
    try{
        const carts = await getAllCarts();
        //console.log(carts)
        res.send({
            carts
        })
    }catch(err){
        console.error('ERROR GETTING ALL CARTS!!!!', err);

    }
    next();
});

//================GET CART BY ID===============
cartsRouter.get("/:cartId", async (req, res, next) => {
    const {cartId} = req.params;
    try{
        const cart = await getCartById(cartId);
        //console.log(cart)
        res.send({
            cart
        })
    }catch(err){
        console.error('ERROR GETTING CART BY ID!!!!', err);

    }
    next();
});

//================GET CART BY USER ID===============
cartsRouter.get("/user/:userId", async (req, res, next) => {
    const {userId} = req.params;
    try{
        const cart = await getCartByUserId(userId);
        //console.log(cart)
        res.send({
            cart
        })
    }catch(err){
        console.error('ERROR GETTING CART BY USER ID!!!!', err);

    }
    next();
});

//================CREATE CART===============
cartsRouter.post("/createcart", async (req, res, next) => {
    console.log("CREATE CART ROUTE")
    const {quantity, cartUserId, productsId} = req.body;
    try{
        const cart = await createCartInventory({quantity, cartUserId, productsId});
        res.send({
            cart,
            message: "Cart Created"
        })
    }catch(err){
        console.error('ERROR CREATING PRODUCT!!!!', err);

    }
    next();
});

//================ADD TO CART===============
cartsRouter.post("/addtocart", async (req, res, next) => {
    console.log("ADD TO CART ROUTE")
    const {productname, productdescription, productprice, quantity, total,cartOwnerId, productId} = req.body;
    try{
        const cart = await addItemToCart({ productname, productdescription, productprice, quantity, total,cartOwnerId, productId});
        res.send({
            cart,
            message: "Product Added to Cart"
        })
    }catch(err){
        console.error('ERROR ADDING A PRODUCT TO CART!!!!', err);

    }
    next();
});


//================GET USER AND CART OR CHECK OUT?===============
cartsRouter.get("/userandcart/:userId", async (req, res, next) => {
    console.log("GET USER AND CART ROUTE")
    const {userId} = req.params;
    try{
        const userAndCart = await getUserAndCart(userId);
        //console.log(userAndCart)
        res.send({
            userAndCart,
            message: "User and Cart Retrieved"
        })
    }catch(err){
        console.error('ERROR GETTING USER AND CART!!!!', err);

    }
    next();
});

//================DELETER CART BY USER ID===============
// cartsRouter.delete("/deletecart/:userId", async (req, res, next) => {
//     console.log("DELETE CART ROUTE")
//     const {userId} = req.params;
//     try{
//         const cart = await deleteCartByUserId(userId);
//         res.send({
//             cart,
//             message: "Cart Deleted"
//         })
//     }catch(err){
//         console.error('ERROR DELETING CART!!!!', err);

//     }
//     next();
// });

//================UPDATE CART==================
cartsRouter.patch("/updatecart/:cartId", async (req, res, next) => {
    console.log("UPDATE CART ROUTE")
    const {cartId} = req.params;
    const {quantity, cartUserId, productsId} = req.body;
    const updateFields = {};
    if (quantity) {
        updateFields.quantity = quantity;
    }
    if (cartUserId) {
        updateFields.cartUserId = cartUserId;
    }
    if (productsId) {   
        updateFields.productsId = productsId;
    }
    try{
        const cart = await updateCart(cartId, updateFields);
        res.send({
            cart,
            message: "Cart Updated"
        })
    }catch(err){
        console.error('ERROR UPDATING CART!!!!', err);

    }
    next();
});

//================DELETE CART BY ID==================
cartsRouter.delete("/deletecart/:cartId", async (req, res, next) => {
    console.log("DELETE CART ROUTE")
    const {cartId} = req.params;
    try{
        const cart = await deleteCart(cartId);
        res.send({
            cart,
            message: "Cart Deleted"
        })
    }catch(err){
        console.error('ERROR DELETING CART!!!!', err);

    }
    next();
});






     module.exports = cartsRouter;