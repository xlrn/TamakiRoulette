
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Choices = new Schema({
    choice0: String,
    choice1: String,
    choice2: String,
    choice3: String,
    choice4: String,
    choice5: String
});
module.exports = mongoose.model('Choices', Choices);
