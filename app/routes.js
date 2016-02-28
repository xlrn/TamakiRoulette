///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var Router = (function () {
    function Router() {
    }
    Router.prototype.start = function () {
        var express = require('express');
        var router = express.Router();
        var passport = require('passport');
        var account = require('../models/account');
        var project = require('../models/project');
        // AWS S3
        var multiparty = require('multiparty');
        var format = require('util').format;
        var aws = require('aws-sdk');
        // Global db
        // var db = require('../db');


        /* GET home page. */
        router.get('/', function (req, res, next) {
            project.findOne({}, function (err, proj1) {
                res.render('homepage', { title: 'Welcome, GGWP!',
                    user: req.user,
                    proj1: proj1 });
            });
        });
        /* GET Register page. */
        router.get('/register', function (req, res) {
            res.render('register', { title: 'Join the Community!', user: req.user, info: req.info });
        });
        /* GET main page. */
        router.get('/main', function (req, res, next) {
            project.find({}, function (err, projs) {
                res.render('main', {
                    title: "Main Hub",
                    user: req.user,
                    projs: projs
                });
            });
        });
        /* GET view page. */
        router.get('/viewing', function (req, res, next) {
            res.render('viewing', { title: "Quest Chronicles P1", user: req.user });
        });
        router.get('/viewing2', function (req, res, next) {
            res.render('viewing2', { title: "Quest Chronicles P2", user: req.user });
        });
        /* GET profile page. */
        router.get('/profile_Viewer', function (req, res, next) {
            res.render('profile_Viewer', { title: "Your Page", user: req.user });
        });
        router.get('/profile_Contributor', function (req, res) {
            project.find({}, function (err, projs) {
                res.render('profile_Contributor', {
                    title: "Your Page",
                    user: req.user,
                    projs: projs
                });
            });
        });
        /* GET upload page. */
        router.get('/upload', function (req, res, next) {
            res.render('upload', { title: "Upload", user: req.user });
        });
        /* Post to Upload Collection. */
        router.post('/upload', function (req, res, next) {
            var form = new multiparty.Form();
            form.parse(req, function (err, fields, files) {
                var img = files.file[0];
                var filename = fields.name || img.originalFilename;
                var db = req.db;
                //var newProject = new Project(req.user.username, filename);
                var collection = db.get('projects');
                var Project = new project({
                    "username": req.user.username,
                    "url": "http://uploadsexynelson.s3.amazonaws.com/" + filename
                });
                Project.save(function (err, req) {
                    if (err) {
                        res.send("There was a problem adding the information to the database.");
                    }
                    else {
                        res.redirect('main');
                    }
                });
            });
        });
        /* POST to Add User Service */
        router.post('/register', function (req, res, next) {
            // Set our internal DB variable
            var db = req.db;
            // New user
            var newUser = new User(req.body.username, req.body.userpassword, req.body.useremail, req.body.usertype, req.body.confirmpassword);
            // Set our collection
            var collection = db.get('accounts');
            // Make new account with passport
            account.register(new account({
                username: newUser.getName(),
                email: newUser.getEmail(),
                userType: newUser.getType()
            }), req.body.userpassword, function (err, account) {
                if (err) {
                    return res.send("Oops! This username already exists! go back and try again!");
                }
                res.redirect('/');
            });
        });
        /* POST to login service */
        router.post('/', passport.authenticate('local'), function (req, res, next) {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('main');
            });
        });
        /* GET Logout page */
        router.get('/logout', function (req, res, next) {
            req.logout();
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
        router.param('query', function (req, res, next, query) {
            req.query = query;
            next();
        });
        router.get('/results/:query', function (req, res, next) {
            project.find({ username: new RegExp(req.query, "i") }, function (err, projects) {
                if (err) {
                    next(err);
                }
                else if (!projects) {
                    return res.render('results', { results: [], user: req.user });
                }
                else {
                    return res.render('results', { results: projects, user: req.user });
                }
            });
        });
        module.exports = router;
    };
    return Router;
})();
var User = (function () {
    function User(name, password, email, type, confirm) {
        this.userName = name;
        this.userPassword = password;
        this.userEmail = email;
        this.userType = type;
        this.userConfirm = confirm;
    }
    User.prototype.getName = function () {
        return this.userName;
    };
    User.prototype.getPassword = function () {
        return this.userPassword;
    };
    User.prototype.getEmail = function () {
        return this.userEmail;
    };
    User.prototype.getType = function () {
        return this.userType;
    };
    User.prototype.getConfirm = function () {
        return this.userConfirm;
    };
    return User;
})();
var Project = (function () {
    function Project(name, url) {
        this.userName = name;
        this.url = "http://uploadsexynelson.s3.amazonaws.com/" + url;
    }
    Project.prototype.getUrl = function () {
        return this.url;
    };
    Project.prototype.getUsername = function () {
        return this.userName;
    };
    return Project;
})();
var router = new Router();
router.start();
