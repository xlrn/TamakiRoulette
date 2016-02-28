module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

  app.get('/', function(req, res) {
    res.render('./views/home');
  })

  var Roulette = require('../app/controllers/roulette.js');

  app.post('/', function(req, res) {
    Roulette.postReg();
  })

};
