var User = require('../model/usuario');
var Report = require('../model/reporte');
const formidable = require("formidable");
var fct = require("./functions");

exports.insert = function (req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        var images0 = [];
        var today = new Date();
        var data = JSON.parse(fields.data);
        for (let j = 0; j < data.analysis.length; j++) {
            images0.push({
                path: data.analysis[j].path,
                date: today.toDateString()
            });
        }

        var images = fct.buildDocTable(files, data, req, images0);

        console.log(images);

        User.find({'email': req.session.user}).exec(function (err, user) {
            if (err)
                return next(err);
            var userid = user[0]._id;
            var newDisease = {
                respuesta: data.response,
                analisis: images,
                enfermedad: data.disease_id,
                medico: userid,
                fecha: Date.now()
            }
            if (data.report_id === 'void') {
                Report.create(newDisease, function (err, result) {
                    console.log(result);
                    res.end();
                });
            } else {
                Report.updateOne({_id: data.report_id}, {$set: newDisease}, function (err, result) {
                    console.log(result);
                    res.end();
                });
            }
        });
    });
}