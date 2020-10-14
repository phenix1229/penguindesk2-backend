const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{type:String, unique:true, lowercase:true, required:true},
    password:{type:String, required:true},
    name:{type:String, default:''},
    company:{type:String, default:''},
    group:{type:String, default:''},
    isAdmin:{type:Boolean, default:false}
});


module.exports = mongoose.model('User', UserSchema);