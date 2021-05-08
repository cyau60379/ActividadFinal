var path = require('path');
var fs = require('fs');
var sha256 = require('js-sha256').sha256;

exports.buildDocTable = function (files, data, req, images) {
    for (let i = 0; i < Object.keys(files).length; i++) {
        var oldPath = files[Object.keys(files)[i]].path;
        var today = new Date();
        var date = today.getFullYear() + "" + (today.getMonth() + 1) + "" + today.getDate();
        var ext = files[Object.keys(files)[i]].name.split(".")[1];
        var filename = req.session.user + "_" + date + "_" + data.disease + i + "." + ext;
        var relativePath = 'images/uploads/' + filename;
        var newPath = path.join(__dirname, '../public/images/uploads/') + filename;
        var rawData = fs.readFileSync(oldPath);
        fs.writeFileSync(newPath, rawData);
        images.push(relativePath);
    }
    return images;
}

exports.encrypt = function (element) {
    var hash = sha256.create();
    try {
        hash.update(element);
        return hash.hex();
    } catch (e) {
        throw e;
    }
}

exports.compare = function (compared, comparator) {
    return compared === comparator;
}