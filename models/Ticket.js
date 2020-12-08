const mongoose = require('mongoose');

const today = () =>{
  return `${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()} (${new Date().getHours()}:${new Date().getMinutes()})`;
};

const TicketSchema = new mongoose.Schema({
  ticketNumber:{type: String},
  openedBy:{type:String},
  openDate:{type:String, default:today},
  client:{type:String, default:''},
  clientLocation:{type:String, default:''},
  issue:{type:String},
  issueType:{type:String},
  status:{type:String, default:'Open'},
  assignedGroup:{type:String},
  assignedTech:{type:String, default:''},
  comments:{type:Array, default:[]},
  resolution:{type:String},
  closedBy:{type:String},
  closeDate:{type:String},
  company:{type:String, default:''},
  owner:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}
});

module.exports = mongoose.model('Ticket', TicketSchema);
