exports.welcome = function (req, res, next) {
    res.render(req.session.page, {user: req.session.type});
};