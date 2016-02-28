module.exports = function(app, passport) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

  var choices = require('../app/models/choices');

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

  app.get('/', function(req, res) {
    res.render('./views/home');
  })

  var Roulette = require('../app/controllers/roulette');

  app.post('/save', function(req, res) {
    // Set our internal DB variable
    var db = req.db;

    // Set our collection
    var collection = db.get('choices');

    // New choices
    var newChoice = new choices({
      "choice0": req.body.choice0,
      "choice1": req.body.choice1,
      "choice2": req.body.choice2,
      "choice3": req.body.choice3,
      "choice4": req.body.choice4,
      "choice5": req.body.choice5
    });
    newChoice.save(function (err, req) {
      if (err) {
        res.send("There was a problem adding the information to the database.");
      }
      else {
        res.redirect('/');
      }
    });
  })

  // Login =================================
        // process the login form
        app.post('/index', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

  // Sign Up =================================

      // process the signup form
      app.post('/index', passport.authenticate('local-signup', {
          successRedirect : '/', // redirect to the secure profile section
          failureRedirect : '/', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
        }));

      };
