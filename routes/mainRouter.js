
const express = require('express');
const router = express.Router(); //Guarda la ejecucion del metodo router de express
const mainController = require('../controllers/mainController');


router.get('/index', mainController.index);

module.exports = router;