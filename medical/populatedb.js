#! /usr/bin/env node

console.log('This script populates some test movies to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var User = require('./model/usuario');
var Tipo = require('./model/tipo');
var Reporte = require('./model/reporte');
var Enfermedad = require('./model/enfermedad');
var Area = require('./model/area');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = [];
var tipos = [];
var reportes = [];
var enfermedades = [];
var areas = [];

function userCreate(email, pwd, nombre, apellido, edad, sexo, domicilio, ciudad, tipo, areaMedica, cb) {
    userDetail = {
        email: email,
        password: pwd,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        sexo: sexo,
        domicilio: domicilio,
        ciudad: ciudad,
        tipo: tipo,
        areaMedica: areaMedica,
        connectado: false
    };

    var user = new User(userDetail);
    user.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New User: ' + user);
        users.push(user);
        cb(null, user)
    });
}

function tipoCreate(nombre, cb) {
    tipoDetail = {
        nombre: nombre
    };

    var tipo = new Tipo(tipoDetail);
    tipo.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New Tipo: ' + tipo);
        tipos.push(tipo);
        cb(null, tipo)
    });
}

function areaCreate(nombre, cb) {
    areaDetail = {
        nombre: nombre
    };

    var area = new Area(areaDetail);
    area.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New Area: ' + area);
        areas.push(area);
        cb(null, area)
    });
}

function createTipos(cb) {
    async.parallel([
            function (callback) {
                tipoCreate('paciente', callback);
            },
            function (callback) {
                tipoCreate('medico', callback);
            },
        ],
        // optional callback
        cb);
}

function createAreas(cb) {
    async.parallel([
            function (callback) {
                areaCreate('void', callback);
            },
            function (callback) {
                areaCreate('generalista', callback);
            },
        ],
        // optional callback
        cb);
}

function createUsers(cb) {
    async.parallel([
            function (callback) {
                userCreate('3ce9727d0502722eb93fe5c95fdfcf824aba949b827312a8f70bbc6400253114', 'badb41cf2f3d81acc0cacc2e8fdfcd03e62cb24316019a8d788d0a4f9c1e19e8', 'Bob', 'Lennon', 32, 'H', 'Suisse', 'Genève', tipos[0], areas[0], callback);
            }
        ],
        // optional callback
        cb);
}

async.series([
        createTipos,
        createAreas,
        createUsers
    ],
// Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    });