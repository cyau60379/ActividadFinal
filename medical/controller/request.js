var User = require('../model/usuario');
var Disease = require('../model/enfermedad');
const formidable = require("formidable");
var fct = require("./functions");

exports.request = function (req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        var images = fct.buildDocTable(files, data, req, []);

        User.find({'email': req.session.user}).exec(function (err, user) {
            if (err)
                return next(err);
            var symptoms = data.symptoms.split(',');
            for (let i = 0; i < symptoms.length; i++) {
                symptoms[i] = symptoms[i].trim();
            }
            var userid = user[0]._id;
            var newDisease = {
                nombre: data.disease,
                duracion: data.duration,
                sintomas: symptoms,
                imagenes: images,
                fecha: Date.now(),
                paciente: userid
            }
            Disease.create(newDisease, function (err, result) {
                console.log(result);
                res.send({redirect: '/respuesta'});
            });
        });
    });
}