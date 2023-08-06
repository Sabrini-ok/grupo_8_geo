
const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/productsController');


// @GET - /products
router.get('/cart', productController.cart);

router.get('/edit', productController.edit);

router.get('/list', productController.getList);

//@Get - /products/:id/detail
router.get('/:id/detail', productController.getDetail);

//@Get - /products/create
router.get('/create', productController.getCreate); //Ruta para crear un producto

//@POST - /products
router.post('/', productController.postProduct);


module.exports = router;