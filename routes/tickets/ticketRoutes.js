const express = require('express');
const router = express.Router();
const ticketController = require('./controllers/ticketController');

router.post('/', ticketController.createTicket);

router.get('/:id', ticketController.getTickets);

router.get('/:id', ticketController.getTicket);

router.put('/:id', ticketController.updateTicket);


module.exports = router;