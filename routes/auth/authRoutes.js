const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authController = require('./controllers/authController');

//get user
router.get('/', auth, authController.getUser);

//get users
router.get('/users', authController.getUsers);

//get groups
router.get('/groups', authController.getGroups);

//get group
router.get('/groups/:id', authController.getGroups);

//login user
router.post('/', authController.login);

//add group
router.post('/groups', authController.addGroup);

//update group
router.put('/groups/:id', authController.updateGroup);

module.exports = router;