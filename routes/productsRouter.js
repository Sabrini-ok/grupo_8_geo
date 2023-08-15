
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productController = require('../controllers/productsController');

const storage = multer.diskStorage ({
    destination: (req, file, callback) => {
        callback(null,  './public/img/prodImages')
    },

    filename: (req, file, callback) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        callback(null, fileName);
    }
})

const uploadFile = multer ({ storage })


// @GET - /products
router.get('/cart', productController.cart);

router.get('/edit', productController.edit);

router.get('/list', productController.getList);

//@Get - /products/:id/detail
router.get('/:id/detail', productController.getDetail);

//@Get - /products/create
router.get('/create', productController.getCreate); //Ruta para crear un producto

//@POST - /products
router.post('/', uploadFile.single('imageUpload'), productController.postProduct);


module.exports = router;