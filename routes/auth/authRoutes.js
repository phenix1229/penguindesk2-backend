const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authController = require('./controllers/authController');

//get user
router.get('/', auth, authController.getUser);

//get users
router.get('/users/:id', authController.getUsers);

//get groups
router.get('/groups/:id', authController.getGroups);

//get group
router.get('/groups/:id', authController.getGroups);

//login user
router.post('/', authController.login);

//add group
router.post('/groups', authController.addGroup);

module.exports = router;