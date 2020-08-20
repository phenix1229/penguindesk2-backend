const Ticket = require('../../../models/Ticket');

//generate random number inclusive of min and max
const randomGen = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//generate random account number
const generateTicketNumber = () => {
    let tktArr = [];
    while(tktArr.length < 9){
        tktArr.push(randomGen(0, 9));
    };
    return tktArr.join('');
};

//find unique ticket number
const findUnique = () => {
    let ticketNum = generateTicketNumber();
    Ticket.find({ticketNumber:ticketNum})
        .then((ticket) => 
        {if(ticket){
            findUnique()
        } else {
            return ticketNum
        }}
        )
        return ticketNum
}


module.exports = {
    randomGen,
    generateTicketNumber,
    findUnique
}