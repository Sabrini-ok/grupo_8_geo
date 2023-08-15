
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/login', userController.login);

router.get('/register', userController.register);

router.post('/register', userController.processRegister);

router.get('/profile/:id', userController.profile);


module.exports = router;