// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 
const authController = require('../controllers/authController');

router.post('/register', userController.register);
router.post('/login', authController.login);

module.exports = router;
