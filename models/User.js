const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email:{type:String, unique:true, lowercase:true, required:true},
    password:{type:String, required:true},
    name:{type:String, default:''},
    group:{type:String, default:''},
    isAdmin:{type:Boolean, default:false},
    tickets:{type:Array}
});


module.exports = mongoose.model('User', UserSchema);