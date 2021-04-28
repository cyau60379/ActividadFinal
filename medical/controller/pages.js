exports.index = function (req, res, next) {
    if (!req.session.user) {
        res.render(req.session.page, {user: '', currentpage: ''});
    } else {
        res.redirect('/home');
    }
};

exports.welcome = function (req, res, next) {
    res.render(req.session.page, {user: req.session.type, currentpage: req.session.page});
};

exports.cuenta = function (req, res, next) {
    req.session.page = 'cuenta';
    res.render(req.session.page, {user: req.session.type, currentpage: req.session.page});
};

exports.peticion = function (req, res, next) {
    req.session.page = 'peticion';
    res.render(req.session.page, {user: req.session.type, currentpage: req.session.page});
};

exports.respuesta = function (req, res, next) {
    req.session.page = 'respuesta';
    res.render(req.session.page, {user: req.session.type, currentpage: req.session.page});
};