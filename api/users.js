const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")

const {
    createUser,
    getAllUsers,
    getUser,
    getUserById,
    getUserByUsername
}= require("../db");

router.post("/register", async (req, res, next) => {
    try{
        if(req.body.password.length < 8){
            throw {
                name:"PASSWORD_LENGTH_ERROR",
                message:"Password Too Short!"
            }
        }

        const existingUser = await getUserByUsername(req.body.username)
        if(existingUser){
            throw{
                name:"USER_EXIST_ERROR",
                message:`User ${req.body.username} is already taken`
            }
        }
        const user = await createUser(req.body)
        const token = jwt.sign({userId:user.id,}, "DONT TELL ANYONE");

        res.send({
            message:"User created",
            token: token,
            user
        })
    }catch(err){
        console.log("There was an error when registering")
        next(err)
    }

})

module.exports = router;