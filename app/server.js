
var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var sequelize   = require('sequelize');
var passport    = require('passport');
var path        = require('path');

// app stuff
var hookJWTStrategy = require('./passportStrategy');

//initiazation
var app         = express();

//enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});

// parse data from body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// log to terminal
app.use(morgan('dev'));

// authentication
app.use(passport.initialize());
hookJWTStrategy(passport);

// static files
app.use(express.static(__dirname + '/../public'));

// base address
app.use('/api', require('./routes/api')(passport));

// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname + '/../public/app/views/index.html'));
// });

// start server
app.listen(3000, () => console.log('api listening on http://localhost:3000'));
