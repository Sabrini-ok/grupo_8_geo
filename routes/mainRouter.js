
const express = require('express');
const router = express.Router(); //Guarda la ejecucion del metodo router de express
const mainController = require('../controllers/mainController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', authMiddleware(false), mainController.index);

router.use((req, res) => {
    res.status(404).render('404');
});

module.exports = router;