var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Usuario = new Schema(
    {
        email: {type: String, required: true, maxlength: 100},
        password: {type: String, required: true, maxlength: 100},
        nombre: {type: String, required: true, maxlength: 100},
        apellido: {type: String, required: true, maxlength: 100},
        edad: {type: Number, required: true},
        sexo: {type: String, required: true, length: 1},
        domicilio: {type: String, required: true, maxlength: 200},
        ciudad: {type: String, required: true, maxlength: 100},
        tipo: {type: Schema.Types.ObjectId, ref: 'TipoUsuario', required: true},
        areaMedica: {type: Schema.Types.ObjectId, ref: 'AreaMedica', required: true},
        connectado: {type: Boolean, required: true, default: true}
    }
);

// Virtual for movie's URL
Usuario
    .virtual('url')
    .get(function () {
        return '/medical/' + this._id;
    });

//Export model
module.exports = mongoose.model('Usuario', Usuario);