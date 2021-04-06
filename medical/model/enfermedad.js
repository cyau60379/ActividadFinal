var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EnfermedadUsuario = new Schema(
    {
        nombre: {type: String, required: true, maxlength: 100},
        duracion: {type: Number, required: true},
        sintomas: [{type: String, maxlength: 200}],
        imagenes: [{type: File}],
        fecha: {type: Date, required: true, default: Date.now()},
        paciente: {type: Schema.Types.ObjectId, ref: 'Usuario', required: true}
    }
);

// Virtual for movie's URL
EnfermedadUsuario
    .virtual('url')
    .get(function () {
        return '/medical/' + this._id;
    });

//Export model
module.exports = mongoose.model('EnfermedadUsuario', EnfermedadUsuario);