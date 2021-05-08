var User = require('../model/usuario');
var Enfermedad = require('../model/enfermedad');

exports.getResponse = function (req, res, next) {
    User.find({'email': req.session.user}).exec(function (err, user) {
        if (err)
            return next(err);
        var userid = user[0]._id;
        Enfermedad.aggregate([
            {$match :
                    {'paciente': userid}
            },
            { $lookup:
                    {
                        from: 'reportes',
                        localField: '_id',
                        foreignField: 'enfermedad',
                        as: 'reports'
                    }
            }
        ]).exec(function (err2, enfermedades) {
            if (err2)
                return next(err2);
            try {
                var reports = [];
                for (let i = 0; i < enfermedades.length; i++) {
                    var status = enfermedades[i].reports.length !== 0;
                    var statusMessage;
                    if (status) {
                        statusMessage = "Response available";
                        reports.push(
                            {
                                disease: enfermedades[i].nombre,
                                date: enfermedades[i].fecha,
                                status: status,
                                statusmes: statusMessage,
                                response: enfermedades[i].reports[0].respuesta,
                                doctor: enfermedades[i].reports[0].medico,
                                resdate: enfermedades[i].reports[0].fecha,
                                analysis: enfermedades[i].reports[0].analisis
                            }
                        )
                    } else {
                        statusMessage = "Not yet";
                        console.log(typeof enfermedades[i].fecha);
                        reports.push(
                            {
                                disease: enfermedades[i].nombre,
                                date: enfermedades[i].fecha,
                                status: status,
                                statusmes: statusMessage,
                                response: "void",
                                doctor: "void",
                                resdate: "void",
                                analysis: "void"
                            }
                        )
                    }
                    console.log(status);
                }
                res.json(reports);
            } catch (e) {
                console.log(e);
                res.send("wrong");
            }
        });
    });
}