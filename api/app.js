var createError = require('http-errors');
var express = require('express');
var path = require('path');

var logger = require('morgan');
var cors = require("cors");
//var session = require('express-jwt');

const indexRouter = require('./routes/index.routes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// parse requests of content-type - application/json
app.use(express.json());

const db = require('./config/db.config')


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

///routes
//app.use('/', indexRouter);
//app.use('/auth', authRouter);
require('./routes/users.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/currency.routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
