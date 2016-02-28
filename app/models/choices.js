
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Choices = new Schema({
    choices: [String],
    title: String
});
module.exports = mongoose.model('Choices', Choices);
