const apiRouter = require('express').Router();


apiRouter.get('/unknown', (req, res, next) => {
  res.status(404).send({
    message: '404 not found',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here
//=======User Router======
const usersRouter = require("./users")
apiRouter.use("/users", usersRouter)

//======Products Router======
const productsRouter = require("./products")
apiRouter.use("/products", productsRouter)

//======Cart Router========
const cartsRouter = require("./carts")  
apiRouter.use("/carts", cartsRouter)

//========Cart Item Router======
module.exports = apiRouter;
