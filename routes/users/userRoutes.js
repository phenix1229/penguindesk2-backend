const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const userValidation = require('./utils/userValidation');

//register new user
router.post('/', userValidation, userController.register);

//logout user
router.get('/logout', userController.logout);

module.exports = router;