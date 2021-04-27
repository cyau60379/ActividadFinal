var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Require controller module.
var connection = require('../controller/connection');
var home = require('../controller/home');

/* GET home page */
router.get('/', connection.verificationSession, connection.index);

/* POST connect the user */
router.post('/connection', jsonParser, connection.connection);

/* POST sign up the user */
router.post('/inscription', jsonParser, connection.inscription);

/* GET home page */
router.get('/home', connection.verificationSession, home.welcome);

module.exports = router;
