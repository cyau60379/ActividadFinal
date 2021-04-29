var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require("express-session");
var filestore = require("session-file-store")(session);
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {exec} = require('child_process');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/salud';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var collections = ['areamedicas', 'tipousuarios', 'usuarios'];
var filled = false;

for (let i = 0; i < collections.length; i++) {
    db.collection(collections[i]).count(function (err, count) {
        if (count == 0 && !filled) {
            console.log("No Found Records.");
            exec("node populatedb mongodb://127.0.0.1:27017/salud", (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
            filled = true;
        } else {
            console.log("Found Records : " + count);
        }
    });
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Creating session
app.use(session({
    name: "session-id",
    secret: "1B8AC6C289B01DAF680ADD5B8AF55E455EEBBC2BE46DE3688FE9CD4BAA2DC8B3", // Secret key,
    saveUninitialized: false,
    resave: false,
    store: new filestore(),
    cookie: {
        httpOnly: true,
        sameSite: true,
        //secure: true
    }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
