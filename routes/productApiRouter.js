const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.getProducts)

router.get('/:id', productsController.getProductDetail)

module.exports = router;