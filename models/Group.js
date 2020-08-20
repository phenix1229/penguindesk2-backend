const mongoose = require('mongoose');


const GroupSchema = new mongoose.Schema({
  name:{type:String},
  members:{type:Array, default:[]},
  tickets:{type:Array, default:[]}
});

module.exports = mongoose.model('Group', GroupSchema);