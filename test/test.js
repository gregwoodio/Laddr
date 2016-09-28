// test.js

process.env.NODE_ENV = 'test';

var server = require('../index');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;

chai.use(chaiHttp);

var email = 'dat@boi.com';
var password = 'oshitwhaddup';

var orgEmail = 'codebusters@laddr.xyz';
var orgPass = 'password';

require('./user')(chai, server, assert, email, password);
require('./login')(chai, server, assert, email, password);
require('./profile')(chai, server, assert, email, password);
require('./organization')(chai, server, assert, orgEmail, orgPass);
require('./login')(chai, server, assert, orgEmail, orgPass);
require('./profile')(chai, server, assert, orgEmail, orgPass);
require('./topic')(chai, server, assert, email, password);
require('./comment')(chai, server, assert, email, password);
require('./posting')(chai, server, assert, orgEmail, orgPass);
require('./password')(chai, server, assert, email, password);
require('./password')(chai, server, assert, orgEmail, orgPass);
require('./apply')(chai, server, assert, orgEmail, orgPass, email, password);