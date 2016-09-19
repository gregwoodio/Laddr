//index.js

var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/config');
var passport = require('passport');
require('./config/passport')(passport);

var app = express();
var port = 3000;

app.set('view engine', 'ejs');
app.set('secret', config.secret);

//body-parser to check for POST parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

//static files
app.use('/js', express.static(__dirname + '/app/public/js'));
app.use('/css', express.static(__dirname + '/app/public/css'));
app.use('/lib', express.static(__dirname + '/app/public/lib'));
app.use('/partials', express.static(__dirname + '/app/public/partials'));
//bower components
app.use('/components', express.static(__dirname + '/app/public/components'));
//app.use(express.static(__dirname + '/app/public'));

//passport setup
// app.use(session({secret: 'supersecretpassworddonttellanyone'}));
// app.use(passport.initialize());
// app.use(passport.session());

//routing
require('./app/routes')(app, passport);

//start listening
app.listen(port);
console.log("Listening on port " + port);

module.exports = app;