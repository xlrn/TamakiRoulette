
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Account = new Schema({
    username: String,
    password: String,
    roulettes: Roulette[]
});
Account.plugin(passportLocalMongoose);

// methods ======================
// generating a hash
account.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
account.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for account and expose it to our app
module.exports = mongoose.model('Account', Account);
