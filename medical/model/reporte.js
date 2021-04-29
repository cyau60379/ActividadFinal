var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Reporte = new Schema(
    {
        respuesta: {type: String, required: true},
        analisis: [{type: Object, required: true}],
        paciente: {type: Schema.Types.ObjectId, ref: 'Usuario', required: true},
        medico: {type: Schema.Types.ObjectId, ref: 'Usuario', required: true},
        fecha: {type: Date, required: true, default: Date.now()}
    }
);

// Virtual for report's URL
Reporte
    .virtual('url')
    .get(function () {
        return '/medical/' + this._id;
    });

//Export model
module.exports = mongoose.model('Reporte', Reporte);