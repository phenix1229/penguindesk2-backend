const Ticket = require('../../../models/Ticket');
const utils = require('../utils/ticketUtils');

module.exports = {
    createTicket:(req, res) => {
        const {openedBy, client, issue, comments, resolution, status, closedBy, closeDate, assignedGroup, assignedTech, company, owner} = req.body;
        const ticketNumber = utils.findUnique();

        const newTicket = new Ticket();
        newTicket.ticketNumber = ticketNumber;
        newTicket.openedBy = openedBy;
        newTicket.client = client;
        newTicket.issue = issue;
        newTicket.comments = comments;
        newTicket.resolution = resolution;
        newTicket.status = status;
        newTicket.closedBy = closedBy;
        newTicket.closeDate = closeDate;
        newTicket.assignedTech = assignedTech;
        newTicket.assignedGroup = assignedGroup;
        newTicket.company = company;
        newTicket.owner = owner
        newTicket.save().then((ticket) => {
            return res.json(ticket);
        });
    },

    getTickets: async (req, res) => {
        try {
            const tickets = await Ticket.find({});
            const ticketList = [];
            tickets.forEach(item => {
                if(item.company === req.params.id && item.status === 'Open'){
                    ticketList.push(item)
                }
            })
            ticketList.reverse();
            res.status(200).json(ticketList);
            // .then((tickets) => {
            //     tickets.reverse();
            //     return res.json(tickets.filter(item => item.status === 'Open'));
            // });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg:'server error'});
        }
    },

    getTicket:(req, res) => {
        Ticket.findById({ _id: req.params.id }).then((ticket) => {
            return res.json(ticket);
        });
    },

    updateTicket:(req, res) => {
        Ticket.findById({ _id: req.params.id }).then((ticket) => {
            // const commentArr = ticket.comments.push(`${today()} - ${req.body.comments}`);
            ticket.status = req.body.status ? req.body.status : ticket.status;
            ticket.client = req.body.client ? req.body.client : ticket.client;
            ticket.clientLocation = req.body.clientLocation ? req.body.clientLocation : ticket.clientLocation;
            ticket.assignedGroup = req.body.assignedGroup ? req.body.assignedGroup : ticket.assignedGroup;
            ticket.assignedTech = req.body.assignedTech ? req.body.assignedTech : ticket.assignedTech;
            ticket.resolution = req.body.resolution ? req.body.resolution : ticket.resolution;
            ticket.comments = req.body.comments;
            ticket.closedBy = req.body.closedBy ? req.body.closedBy : ticket.closedBy;
            ticket.closeDate = req.body.closeDate ? req.body.closeDate : ticket.closeDate;
            ticket.save().then((ticket) => res.json(ticket));
        });
    }
}