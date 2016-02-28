modules.exports = function (app) {
  renderReg = function(req, res) {

    var Account = (function () {
      function Account(name, password) {
        this.userName = name;
        this.userPassword = password;
        }
        User.prototype.getName = function () {
          return this.userName;
        };
        User.prototype.getPassword = function () {
          return this.userPassword;
        };
      return User;
    })();

    res.render('register', {title: 'Join, you tool!', user: req.user, info: user.info})
  });

  postReg = function (req, res, next) {
    // Set our internal DB variable
    var db = req.db;
    // New user
    var newAccount = new Account(req.body.username, req.body.userpassword);
    // Set our collection
    var collection = db.get('accounts');
    // Make new account with passport
    account.register(new account({
        username: newAccount.getName(),
        password: newAccount.getPassword(),
    }), req.body.userpassword, function (err, account) {
        if (err) {
            return res.send("Oops! This username already exists! go back and try again!");
        }
        res.redirect('/');
    });
  }

}
