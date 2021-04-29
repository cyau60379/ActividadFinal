var User = require('../model/usuario');
var Disease = require('../model/enfermedad');
const formidable = require("formidable");
var path = require('path');
var fs = require('fs');

exports.request = function (req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        var images = [];
        var data = JSON.parse(fields.data);
        for (let i = 0; i < Object.keys(files).length; i++) {
            var oldPath = files[Object.keys(files)[i]].path;
            var today = new Date();
            var date = today.getFullYear() + "" + (today.getMonth() + 1) + "" + today.getDate();
            var ext = files[Object.keys(files)[i]].name.split(".")[1];
            var relativePath = 'images/uploads/' + req.session.user + "_" + date + "_" + data.disease + "." + ext;
            var newPath = path.join(__dirname, '../public/images/uploads/') + req.session.user + "_" + date + "_" + data.disease + "." + ext;
            var rawData = fs.readFileSync(oldPath);
            fs.writeFileSync(newPath, rawData);
            images.push(relativePath);
        }

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
            Disease.create(newDisease, function(err, result) {
                console.log(result);
                res.send({redirect: '/respuesta'});
            });
        });
    });
}