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
const userRouter = require("./users")
apiRouter.use("/user", userRouter)

//======Products Router======


//======Cart Router========


//========Cart Item Router======
module.exports = apiRouter;
