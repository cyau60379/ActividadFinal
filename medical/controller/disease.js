var User = require('../model/usuario');
var Disease = require('../model/enfermedad');


exports.get = function (req, res, next) {
    Disease.aggregate([
        {
            $lookup:
                {
                    from: 'reportes',
                    localField: '_id',
                    foreignField: 'enfermedad',
                    as: 'reports'
                }
        }
    ]).exec(function (err2, diseases) {
        if (err2)
            return next(err2);
        try {
            console.log(diseases);
            var reports = [];
            for (let i = 0; i < diseases.length; i++) {
                var status = diseases[i].reports.length !== 0;
                var statusMessage;
                if (status) {
                    statusMessage = "Response sent";
                    reports.push(
                        {
                            disease_id: diseases[i]._id,
                            disease: diseases[i].nombre,
                            date: diseases[i].fecha,
                            patient: diseases[i].paciente,
                            status: status,
                            statusmes: statusMessage,
                            response: diseases[i].reports[0].respuesta,
                            resdate: diseases[i].reports[0].fecha,
                            analysis: diseases[i].reports[0].analisis,
                            report_id: diseases[i].reports[0]._id,
                        }
                    )
                } else {
                    statusMessage = "Not yet";
                    reports.push(
                        {
                            disease_id: diseases[i]._id,
                            disease: diseases[i].nombre,
                            date: diseases[i].fecha,
                            patient: diseases[i].paciente,
                            status: status,
                            statusmes: statusMessage,
                            response: "void",
                            resdate: "void",
                            analysis: "void",
                            report_id: "void"
                        }
                    )
                }
            }
            res.json(reports);
        } catch (e) {
            console.log(e);
            res.send("wrong");
        }
    });
}

exports.getUsuario = function (req, res, next) {
    User.find({_id: req.body.user}).limit(1).exec(function (err, users) {
        if (err)
            return next(err);
        var response = {
            name: users[0].nombre + " " + users[0].apellido,
            age: users[0].edad,
            sex: users[0].sexo,
            address: users[0].domicilio + ", " + users[0].ciudad,
        }
        res.send(response);
    });
}