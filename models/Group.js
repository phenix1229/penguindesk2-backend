const mongoose = require('mongoose');


const GroupSchema = new mongoose.Schema({
  name:{type:String},
  company:{type:String, default:''},
  owner:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}
});

module.exports = mongoose.model('Group', GroupSchema);