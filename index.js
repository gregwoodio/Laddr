//index.js

var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var port = 3000;

app.set('view engine', 'ejs');

//body-parser to check for POST parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

//routing
require('./app/routes')(app);

//start listening
app.listen(port);
console.log("Listening on port " + port);
