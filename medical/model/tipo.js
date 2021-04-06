var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TipoUsuario = new Schema(
    {
        nombre: {type: String, required: true},
    }
);

// Virtual for movie's URL
TipoUsuario
    .virtual('url')
    .get(function () {
        return '/medical/' + this._id;
    });

//Export model
module.exports = mongoose.model('TipoUsuario', TipoUsuario);