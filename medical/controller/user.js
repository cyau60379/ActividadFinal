var User = require('../model/usuario');
var Tipo = require('../model/tipo');

exports.getInfo = function (req, res, next) {
    var query = User.find({'email': req.session.user});
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
};