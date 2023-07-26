
const express = require('express');
const router = express.Router(); 
const productController = require('../controllers/productsController');

router.get('/cart', productController.cart);

router.get('/:id', productController.productDetail);


module.exports = router;