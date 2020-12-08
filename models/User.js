const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{type:String, unique:true, lowercase:true, required:true},
    password:{type:String, required:true},
    name:{type:String, default:''},
    group:{type:String, default:''},
    isAdmin:{type:Boolean, default:false},
    company:{type:String, default:''},
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}
});


module.exports = mongoose.model('User', UserSchema);