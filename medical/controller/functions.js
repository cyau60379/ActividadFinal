var path = require('path');
var fs = require('fs');

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