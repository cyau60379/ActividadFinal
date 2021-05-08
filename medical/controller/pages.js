exports.index = function (req, res, next) {
    if (!req.session.user) {
        res.render(req.session.page, {user: '', currentpage: ''});
    } else {
        res.redirect('/home');
    }
};

exports.welcome = function (req, res, next) {
    req.session.page = 'home' + req.session.type.charAt(0).toUpperCase() + req.session.type.slice(1);
    res.render(req.session.page, {user: req.session.type, currentpage: req.session.page, username: req.session.name});
};

exports.cuenta = function (req, res, next) {
    req.session.page = 'cuenta';
    res.render(req.session.page, {user: req.session.type, currentpage: req.session.page, username: req.session.name});
};

exports.peticion = function (req, res, next) {
    req.session.page = 'peticion';
    res.render(req.session.page, {user: req.session.type, currentpage: req.session.page, username: req.session.name});
};

exports.respuesta = function (req, res, next) {
    req.session.page = 'respuesta';
    res.render(req.session.page, {user: req.session.type, currentpage: req.session.page, username: req.session.name});
};

exports.consulta = function (req, res, next) {
    req.session.page = 'consulta';
    res.render(req.session.page, {user: req.session.type, currentpage: req.session.page, username: req.session.name});
};