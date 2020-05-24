var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username:{type:String},
    maths:{type:Number},
    physics:{type:Number},
    chemistry:{type:Number}
});

module.exports = mongoose.model('users',userSchema);