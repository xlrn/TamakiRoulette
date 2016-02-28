var Application = (function () {
    function Application() {
    }
    Application.prototype.start = function () {
        var express = require('express');
        var path = require('path');
        var favicon = require('serve-favicon');
        var logger = require('morgan');
        var cookieParser = require('cookie-parser');
        var bodyParser = require('body-parser');
        // New Code
        var mongoose = require('mongoose');
        var mongo = require('mongodb');
        var monk = require('monk');
        var db = mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds064188.mlab.com:64188/teamtamaki');
        //var db = monk('localhost:27017/teamash');
        var routes = require('./routes/index');
        var users = require('./routes/users');
        var app = express();
        var passport = require('passport');
        var LocalStrategy = require('passport-local').Strategy;
        // view engine setup
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'jade');
        // uncomment after placing your favicon in /public
        //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(require('express-session')({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(express.static(path.join(__dirname, 'public')));
        // Make our db accessible to our router
        app.use(function (req, res, next) {
            req.db = db;
            next();
        });
        app.use('/', routes);
        app.use('/users', users);
        // passport config
        var Account = require('./models/account');
        passport.use(new LocalStrategy(Account.authenticate()));
        passport.serializeUser(Account.serializeUser());
        passport.deserializeUser(Account.deserializeUser());
        // mongoose
        //mongoose.connect('mongodb://localhost/teamash');
        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err[status] = 404;
            next(err);
        });
        // error handlers
        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }
        // production error handler
        // no stacktraces leaked to user
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
        module.exports = app;
    };
    ;
    return Application;
})();
;
var application = new Application();
application.start();
