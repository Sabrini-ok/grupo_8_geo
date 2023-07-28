
const express = require('express');
const router = express.Router(); 
const productController = require('../controllers/productsController');

router.get('/cart', productController.cart);

router.get('/detail', productController.productDetail);

router.get('/edit', productController.edit);


module.exports = router;