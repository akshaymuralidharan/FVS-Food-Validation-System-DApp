var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//adding the web3 code to connect with the solidity contract
var Web3 = require('web3');
var MyContractJSON = require(path.join(__dirname, 'build/contracts/FVS.json'));
contractAddress = MyContractJSON.networks['4002'].address;
coinbase = "0x424AE0acc7a5D0D54259d0E50f30a9A0a39f3BF6";
abi = MyContractJSON.abi;
web3 = new Web3(Web3.providers.HttpProvider("http://localhost:8545"));

MyContract = new web3.eth.Contract(abi, contractAddress);


//creting new routers
var rawdealerRouter = require('./routes/rawdealer');
var adminRouter = require('./routes/admin')
var indexRouter = require('./routes/index');
var manufacturerRouter = require('./routes/manufacturer');
var usersRouter = require('./routes/users');
var sellerRouter = require('./routes/seller');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/rawdealer', rawdealerRouter);
app.use('/admin', adminRouter);
app.use('/', indexRouter);
app.use('/manufacturer', manufacturerRouter);
app.use('/users', usersRouter);
app.use('/seller', sellerRouter);

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
