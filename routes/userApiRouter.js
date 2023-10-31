const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers)

router.get('/:id', userController.getUser)

module.exports = router;