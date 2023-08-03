
const express = require('express');
const router = express.Router(); 
const productController = require('../controllers/productsController');


// @GET - /products
router.get('/cart', productController.cart);

router.get('/edit', productController.edit);

router.get('/list', productController.getList);

router.get('/:id/detail', productController.getDetail);

router.get('/create', productController.getCreate);

//@POST - /products
router.post('/', productController.postProduct);


module.exports = router;