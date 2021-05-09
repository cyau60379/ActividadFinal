var User = require('../model/usuario');
var Tipo = require('../model/tipo');
var Disease = require('../model/enfermedad');
var fct = require("./functions");

exports.getInfo = function (req, res, next) {
    var filter = {'email': req.session.user};
    if (req.body.user !== undefined) {
        filter = {'_id': req.body.user};
    }
    var query = User.find(filter);
    query.limit(1);
    query.exec(function (err, user) {
        if (err)
            return next(err);
        try {
            var newUser = {
                email: req.session.email,
                name: user[0].nombre,
                surname: user[0].apellido,
                age: user[0].edad,
                sex: user[0].sexo,
                address: user[0].domicilio,
                city: user[0].ciudad
            }
            res.json(newUser);
        } catch (e) {
            console.log(e);
            res.send("wrong");
        }
    });
}

exports.update = function (req, res, next) {
    var hashedMail = fct.encrypt(req.body.email);
    var hashedPwd = fct.encrypt(req.body.password);
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

exports.getAddresses = function (req, res, next) {
    Tipo.find({'nombre': 'paciente'}).exec(function (err, tipo) {
        if (err)
            return next(err);
        var query = User.find({'tipo': tipo[0]._id});
        query.select('domicilio');
        query.exec(function (err, user) {
            if (err)
                return next(err);
            try {
                console.log(user);
                res.json(user);
            } catch (e) {
                console.log(e);
                res.send("wrong");
            }
        });
    });
}

exports.getDiseases = function (req, res, next) {
    var d = new Date();
    console.log(d);
    d.setDate(d.getDate() - 30);  //from last month to now
    var iso = d.toISOString();
    console.log(d);
    console.log(iso);
    Disease.find({fecha: {$gt: iso}}).exec(function (err, diseases) {
        if (err)
            return next(err);
        var count = 0;
        var users = [];
        var dis = [];
        for (let i = 0; i < diseases.length; i++) {
            dis.push(diseases[i].nombre);
            if (!users.includes(diseases[i].paciente.toString())) {
                users.push(diseases[i].paciente.toString());
                count++;
            }
        }
        var result = {
            diseases: dis,
            num: count,
            //users: users
        };
        res.send(result);
    });
}