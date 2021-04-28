var User = require('../model/usuario');

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