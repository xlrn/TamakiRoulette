
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Roulette = new Schema({
    username: String,
    url: String
});
module.exports = mongoose.model('Roulette', Roulette);
