var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Require controller module.
var connection = require('../controller/connection');
var page = require('../controller/pages');
var user = require('../controller/user');
var request = require('../controller/request');
var response = require('../controller/response');
var disease = require('../controller/disease');
var report = require('../controller/report');

/* GET home page */
router.get('/', connection.verificationSession, page.index);

/* POST connect the user */
router.post('/connection', jsonParser, connection.connection);

/* POST sign up the user */
router.post('/inscription', jsonParser, connection.inscription);

/* POST update the user */
router.post('/update', jsonParser, connection.verificationSession, user.update);

/* POST get info of the user */
router.post('/getInfo', jsonParser, connection.verificationSession, user.getInfo);

/* POST get addresses of the users */
router.post('/getAddresses', jsonParser, connection.verificationSession, user.getAddresses);

/* POST get diseases of the users */
router.post('/getDiseases', jsonParser, connection.verificationSession, user.getDiseases);

/* POST get diseases' information */
router.post('/getDiseasesInfo', jsonParser, connection.verificationSession, disease.get);

/* POST get user's information of the current disease */
router.post('/getUsuarioFromDisease', jsonParser, connection.verificationSession, disease.getUsuario);

/* POST register report */
router.post('/registerReport', jsonParser, connection.verificationSession, report.insert);

/* POST get response for the user */
router.post('/getResponse', jsonParser, connection.verificationSession, response.getResponse);

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

/* GET consultation page */
router.get('/consulta', connection.verificationSession, page.consulta);

module.exports = router;
