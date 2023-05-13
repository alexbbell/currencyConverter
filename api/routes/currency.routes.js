const { authJwt } = require('../middleware')
const controller = require("../controllers/currency.controller");


module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  
  
  
  app.get(
    "/api/currency/Currencies",
    [authJwt.verifyToken],
    controller.TodayRates
  );

  app.get("/api/currency/src/:srcCur/dst/:dstCur",
    [authJwt.verifyToken],
    controller.GetCurrentRate
  );
  app.get("/api/currency/today/:srcCur/",
    [authJwt.verifyToken],
    controller.TodayRates
  );


}



