var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Require controller module.
var connection = require('../controller/connection');
var page = require('../controller/pages');
var user = require('../controller/user');
var request = require('../controller/request');

/* GET home page */
router.get('/', connection.verificationSession, page.index);

/* POST connect the user */
router.post('/connection', jsonParser, connection.connection);

/* POST sign up the user */
router.post('/inscription', jsonParser, connection.inscription);

/* POST update the user */
router.post('/update', jsonParser, connection.verificationSession, connection.update);

/* POST update the user */
router.post('/getInfo', jsonParser, connection.verificationSession, user.getInfo);

/* POST sign up the user */
router.post('/signout', jsonParser, connection.signOut);

/* POST request th e user */
router.post('/request', jsonParser, connection.verificationSession, request.request);

/* GET home page */
router.get('/home', connection.verificationSession, page.welcome);

/* GET account page */
router.get('/cuenta', connection.verificationSession, page.cuenta);

/* GET request page */
router.get('/peticion', connection.verificationSession, page.peticion);

/* GET response page */
router.get('/respuesta', connection.verificationSession, page.respuesta);

module.exports = router;
