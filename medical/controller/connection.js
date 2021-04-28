var User = require('../model/usuario');
var Tipo = require('../model/tipo');
var Area = require('../model/area');
var sha256 = require('js-sha256').sha256;

exports.verificationSession = function (req, res, next) {
    if (!req.session.user) { // No user set with the current session
        req.session.page = 'index';  // Go to connection page
        if (req.url !== '/') {
            res.redirect('/');
        }
    }
    next();
}

exports.connection = function (req, res, next) {
    var hashedMail = encrypt(req.body.email);
    var hashedPwd = encrypt(req.body.password);
    var query = User.find({'email': hashedMail});
    query.select('email password nombre apellido tipo');
    query.limit(1);
    query.exec(function (err, user) {
        if (err)
            return next(err);
        try {
            if (compare(hashedPwd, user[0].password)) {
                Tipo.find({'_id': user[0].tipo}).exec(function (err, tipo) {
                    req.session.user = hashedMail;
                    req.session.email = req.body.email;
                    req.session.name = user[0].nombre + " " + user[0].apellido;
                    req.session.type = tipo[0].nombre;
                    res.send({redirect: '/home'});
                });
            } else {
                console.log("Wrong auth");
                res.send("wrong");
            }
        } catch (e) {
            console.log(e);
            res.send("wrong");
        }
    });
}

exports.inscription = function (req, res, next) {
    var hashedMail = encrypt(req.body.email);
    var hashedPwd = encrypt(req.body.password);
    Tipo.find({'nombre': 'paciente'}).exec(function (err, tipo) {
        if (err)
            return next(err);
        Area.find({'nombre': 'void'}).exec(function (err2, area) {
            if (err2)
                return next(err2);
            var newUser = {
                email: hashedMail,
                password: hashedPwd,
                nombre: req.body.name,
                apellido: req.body.surname,
                edad: req.body.age,
                sexo: req.body.sex,
                domicilio: req.body.address,
                ciudad: req.body.city,
                tipo: tipo[0]._id,
                areaMedica: area[0]._id,
                connectado: false
            }
            User.create(newUser, function(err, result) {
                console.log(result);
                req.session.user = hashedMail;
                req.session.email = req.body.email;
                req.session.name = req.body.name + " " + req.body.surname;
                req.session.type = 'paciente';
                req.session.page = 'homePaciente';
                res.send({redirect: '/home'});
            });
        });
    });
}

exports.update = function (req, res, next) {
    var hashedMail = encrypt(req.body.email);
    var hashedPwd = encrypt(req.body.password);
    var newUser = {
        email: hashedMail,
        password: hashedPwd,
        nombre: req.body.name,
        apellido: req.body.surname,
        edad: req.body.age,
        sexo: req.body.sex,
        domicilio: req.body.address,
        ciudad: req.body.city
    }

    User.updateOne({email: req.session.user}, {$set: newUser}, function(err, result) {
        if (err) {
            res.send("wrong");
        } else {
            req.session.user = hashedMail;
            req.session.email = req.body.email;
            req.session.name = req.body.name + " " + req.body.surname;
            res.end();
        }
    });
}

exports.signOut = function (req, res, next) {
    req.session.destroy();
    res.send({redirect: '/'});
}

function encrypt(element) {
    var hash = sha256.create();
    try {
        hash.update(element);
        return hash.hex();
    } catch (e) {
        throw e;
    }
}

function compare(compared, comparator) {
    return compared === comparator;
}