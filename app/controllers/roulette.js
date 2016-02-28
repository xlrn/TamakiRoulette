modules.exports = function (app) {

  var Choices = function() {
  function Choices(choice0, choice1, choice2, choice3, choice4, choice5) {
    this.choice0 = choice0;
    this.choice1 = choice1;
    this.choice2 = choice2;
    this.choice3 = choice3;
    this.choice4 = choice4;
    this.choice5 = choice5;
  };

  postReg = function (req, res, next) {
    // Set our internal DB variable
    var db = req.db;

    // Set our collection
    var collection = db.get('choices');

    // New choices
    var newChoice = new choices({
      "choice0": req.choice0;
      "choice1": req.choice1;
      "choice2": req.choice2;
      "choice3": req.choice3;
      "choice4": req.choice4;
      "choice5": req.choice5;
    });
    newChoice.save(function (err, req) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.redirect('main');
          }
        }
      };

}
