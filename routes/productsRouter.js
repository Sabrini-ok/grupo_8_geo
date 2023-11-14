const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const { body } = require('express-validator')

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



const validations = [
    body('productName').notEmpty(),
    body('productDescription').notEmpty(),
    body('productCategory').notEmpty(),
    body('productPrice').notEmpty().isNumeric(),
    body('imageUpload').notEmpty(),
    body('masBuscado').notEmpty,
]

const productController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');

// @GET - /products
router.get('/cart', authMiddleware(false), productController.cart);

router.use(authMiddleware(true, true));

router.get('/:id/edit', productController.getEdit);

router.get('/list', productController.getList);

//@Get - /products/:id/detail
router.get('/:id/detail', productController.getDetail);

//@Get - /products/create
router.get('/create', productController.getCreate); //Ruta para crear un producto

//@POST - /products
router.post('/', uploadFile.single('imageUpload'), productController.postProduct);

// @DELETE - /products/:id/delete
router.post('/:id/delete', productController.deleteProduct);

router.put('/:id/edit', productController.updateProduct);

module.exports = router;