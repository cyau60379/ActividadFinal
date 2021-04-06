var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AreaMedica = new Schema(
    {
        nombre: {type: String, required: true},
    }
);

// Virtual for movie's URL
AreaMedica
    .virtual('url')
    .get(function () {
        return '/medical/' + this._id;
    });

//Export model
module.exports = mongoose.model('AreaMedica', AreaMedica);