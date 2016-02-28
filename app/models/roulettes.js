///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = new Schema({
    username: String,
    url: String
});
module.exports = mongoose.model('Project', Project);
