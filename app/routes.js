module.exports = function (app, passport) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    var choices = require('../app/models/choices');
    var roulette = require('../app/models/roulette');

    //Get roulette required:id
    app.get('/roulettes/:id', function (req, res) {
        var idToGet = req.params.id;
        choices.findOne({_id: idToGet}, function (err, choices) {
            if (err) {
                next(err);
            }
            res.json(choices);
        });
    });

    //Get list of all roulettes
    app.get('/roulettes', function (req, res) {
        roulette.find({username: req.user}, function (err, projects) {
            if (err) {
                next(err);
            }
            else if (!projects) {
                res.json([]);
            }
            else {
                res.json(projects);
            }
        });
    });

    // Save roulette
    app.post('/roulettes', function (req, res, next) {
        // New choices
        var newChoice = new choices({
            "choices": req.body.choices,
            "title": req.body.cName
        });
        newChoice.save(function (err) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // submit roulette
                var Title = newChoice.title;
                var ObjectId = newChoice._id.toString();

                var newRoulette = new roulette({
                    "username": req.user,
                    "title": Title,
                    "id": ObjectId
                });

                newRoulette.save(function (err) {
                    if (err) {
                        res.send("You have a problem");
                    }
                    else {
                        res.redirect('/');
                    }
                });
            }
        });
    });

    //Update roulette
    app.put('/roulettes', function (req, res) {
        var newName = req.body.title;
        // this crazy thing has to be done twice because "title" is found in both roulettes and choices :/
        roulette.findByIdAndUpdate(req.body._id, { $set: { title: newName }}, function (err, roulette) {
            if (!err) {
                choices.findByIdAndUpdate(req.body.id, {$set: {title: newName}}, function (err, choice) {
                    if (!err) {
                        res.send(choice);
                    }
                });
            }
        });
    });

    //Delete a roulette
    app.delete('/roulettes/:id', function (req, res) {
        var idToDelete = req.params.id;
        roulette.findOne({id: idToDelete}, function (err1, project) {
            if (!err1) {
                roulette.find({id: idToDelete}).remove(function (err2) {
                    if (!err2) {
                        choices.find({_id: project.id}).remove(function (err3) {
                            if (!err3) {
                                res.send(project);
                            }
                        });
                    }
                });
            }
        });
    });


    // Login =================================
    // process the login form
    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                return next(err); //will generate a 500 error
            }
            // Generate a JSON response
            if (!user) {
                res.send({ aUser: user, aInfo: info, success : false, message : 'Incorrect username and password' });
            }
            else {
                req.logIn(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    return res.send({ aUser: user, aInfo: info, success: true, message: 'Login successful'});
                });
            }
        })(req, res, next);
    });

    // Sign Up =================================

    // process the signup form
    app.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) {
                return next(err); //will generate a 500 error
            }
            // Generate a JSON response
            if (!user) {
                res.send({ success : false, aInfo: info, message : 'Username already taken' });
            }
            else {
                res.send({ user: user, success: true, message: 'Signup successful'});
            }
        })(req, res, next);
    });

    app.get('/logout', function (req, res) {
        req.logout();
        req.session.destroy(function (err) {
            res.send();
        });
    });

    app.get('/account', function (req, res) {
        if (req.user) {
            res.send({user : req.user});
        } else {
            res.send({user : null});
        }
    });

    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });
}
