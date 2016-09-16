// test.js

process.env.NODE_ENV = 'test';

var server = require('../index');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;

chai.use(chaiHttp);

var username = 'DatBoi';
var password = 'oshitwhaddup';

var orgName = 'Codebusters';
var orgPass = 'password';

require('./user')(chai, server, assert, username, password);
require('./login')(chai, server, assert, username, password);
require('./profile')(chai, server, assert, username, password);
require('./organization')(chai, server, assert, orgName, orgPass);
require('./login')(chai, server, assert, orgName, orgPass);
require('./profile')(chai, server, assert, orgName, orgPass);
require('./topic')(chai, server, assert, username, password);
require('./comment')(chai, server, assert, username, password);
require('./posting')(chai, server, assert, orgName, orgPass);