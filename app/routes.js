module.exports = function(app, passport) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

  var choices = require('../app/models/choices');
  var roulette = require('../app/models/roulette');


  app.get('/roulette', function(req, res) {
      roulette.find({ username: 'placeholder' }, function (err, projects) {
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

  app.get('/choices', function(req, res) {
     choices.findOne({ _id: req.query.id}, function(err, choices) {
          if(err) {
              next(err);
          }
          res.json(choices);
      });
  });

  // submit choices to database

  app.post('/save', function(req, res, next) {
    // Set our internal DB variable
    var db = req.db;

    // Set our collection
    var collection = db.get('choices');

    // New choices
    var newChoice = new choices({
      "choices": req.body.choices,
      "title": req.body.cName
    });
    newChoice.save(function (err, req) {
      if (err) {
        res.send("There was a problem adding the information to the database.");
      }
      else {

        // submit roulette
        var Title = newChoice.title;
        var ObjectId = newChoice._id.toString();


        collection = db.get('roulettes');

        var newRoulette = new roulette({
          "username": "placeholder",
          "title": Title,
          "id": ObjectId
        });

        newRoulette.save(function(err, req) {
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


  // Login =================================
        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
          }));

  // Sign Up =================================

      // process the signup form
      app.post('/signup', passport.authenticate('local-signup', {
          successRedirect : '/', // redirect to the secure profile section
          failureRedirect : '/', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
        }));


    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
  }
