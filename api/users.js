const express = require("express")
const usersRouter = express.Router();
const jwt = require("jsonwebtoken")
usersRouter.use(express.json());

const {
    createUser,
    getAllUsers,
    deleteUser,
    getUser,
    getUserById,
    getUserByUsername
}= require("../db");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next(); 
});

//================GET ALL USERS===============
usersRouter.get("/", async (req, res, next) => {
    try{
        const users = await getAllUsers();
        //console.log(users)
        res.send({
            users
        })
    }catch(err){
        console.error('ERROR GETTING ALL USERS!!!!', err);
      
    }
    next();   
});



//================LOGIN USER================

usersRouter.post('/login', async (req, res, next) => {
    console.log("LOGIN ROUTE")
    const { username, password } = req.body;
    console.log(username, password)
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    };
    try {
        const user =await getUserByUsername(username)
      console.log(user)
      if (user.password == password) {
        const token = jwt.sign({
          id: user.id, 
          username: user.username, 
          password: user.password 
        }, process.env.JWT_SECRET);
        res.send({ message: "you're logged in!", success: true, token: token});
      } else {
        next({ 
          name: 'IncorrectCredentialsError', 
          message: 'Username or password is incorrect'
        });
      };
    } catch(error) {
      console.log(error);
      next(error);
    };
  });


//==============REGISTER USER================

usersRouter.post('/register',async (req, res, next) => {

    console.log("REGISTER ROUTE")
    const { username, password, email, isAdmin } = req.body;
  
    try {
      const _user = await getUserByUsername(username);
  
      if (_user) {
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      }
  
      const user = await createUser({
        username,
        password,
        email,
        isAdmin
       
      });
  
      const token = jwt.sign({ 
        id: user.id, 
        username
      }, process.env.JWT_SECRET, {
      
      });
  
      res.send({ 
        message: "thank you for signing up",
        success: true,
       token:  token 
      });
    } catch ({ name, message }) {
      next({ name, message })
    } 
  });

//=================GET USER================

usersRouter.get('/me', async (req, res, next) => {
    console.log("GET USER ROUTE")
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next({
            name: "AuthorizationHeaderError",
            message: `Authorization token must be supplied as Bearer Token`
        });
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);

            if (id) {
                req.user = await getUserById(id);
                next();
            }   
        } catch ({ name, message }) {
            next({ name, message })
        }
    } else {
        next({
            name: "AuthorizationHeaderError",
            message: `Authorization token must be supplied as Bearer Token`
        });
    }
}, (req, res, next) => {
    res.send(req.user);
});



//================GET USER BY ID================

usersRouter.get("/:userId", async (req, res, next) => {
    const { userId } = req.params;
    try {   
        const user = await getUserById(userId);
        if(user){
            res.send({
                user
            })
        }else{
            next({
                name: "UserNotFoundError",
                message: "User Not Found"
            })
        }
    } catch (error) {
        console.error('ERROR Getting User by Id!!!',err);
        throw err;
    }
    next();
});

//================GET USER BY USERNAME================

usersRouter.get("/username/:username", async (req, res, next) => {
    const { username } = req.params;
    try {
        const user = await getUserByUsername(username);
        if(user){
            res.send({
                user
            })
        }else{
            next({
                name: "UserNotFoundError",
                message: "User Not Found"
            })
        }
    } catch (error) {
        console.error('ERROR Getting User by Username!!!',err);
        throw err;
    }
    next();
});

//================UPDATE USER================

usersRouter.patch("/:userId", async (req, res, next) => {
    const { userId } = req.params;
    const { username, password, email, isAdmin } = req.body;
    const updateFields = {};
    if (username) {
        updateFields.username = username;
    }
    if (password) {
        updateFields.password = password;
    }
    if (email) {
        updateFields.email = email;
    }
    if (isAdmin) {
        updateFields.isAdmin = isAdmin;
    }
    try {
        const updatedUser = await updateUser(userId, updateFields);
        res.send({
            user: updatedUser
        })
    } catch (error) {
        console.error('ERROR Updating User!!!',err);
        throw err;
    }
    next();
});

//================DELETE USER================

usersRouter.delete("/:userId", async (req, res, next) => {
    const { userId } = req.params;
    try {
        const deletedUser = await deleteUser(userId);
        res.send({
            user: deletedUser
        })

    } catch (error) {
        console.error('ERROR Deleting User!!!',err);
        throw err;
    }
    next();
});



//================GET USER CART================

usersRouter.get("/:userId/cart", async (req, res, next) => {
    const { userId } = req.params;
    try {
        const cart = await getCartByUserId(userId);
        if(cart){
            res.send({
                cart
            })
        }else{
            next({
                name: "CartNotFoundError",
                message: "Cart Not Found"
            })
        }
    } catch (error) {

        console.error('ERROR Getting Cart by User Id!!!',err);
        throw err;
    }
    next();
});



module.exports = usersRouter;