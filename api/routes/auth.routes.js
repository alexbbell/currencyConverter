var express = require('express');
var router = express.Router();

const { authJwt  } = require('../middleware');
const controller  = require('../controllers/auth.controller');


module.exports = function(app) {
/* GET home page. */
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});


  app.get('/auth', controller.noAccess)

  app.post('/auth/signup', controller.testAuth)
  // let authUser = require('./../controllers/auth.controller')
  // res.status(authUser.signin(req, res));
  // let authUser = authJwt.verifyToken
  // console.log({authUser});

  app.post("/api/auth/signin", controller.signin)


}
