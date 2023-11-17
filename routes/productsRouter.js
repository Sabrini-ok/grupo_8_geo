const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/img/prodImages');
    },
    filename: (req, file, callback) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        callback(null, fileName);
    }
});

const uploadFile = multer({ storage });

// Validaciones para los datos del producto
const validations = [
    body('productName').notEmpty(),
    body('productDescription').notEmpty(),
    body('productCategory').notEmpty(),
    body('productPrice').notEmpty().isNumeric(),
    body('imageUpload').notEmpty(),
    body('masBuscado').notEmpty(),
];

const productController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');

// @GET - /products/cart
router.get('/cart', authMiddleware(false), productController.cart);

// Middleware para verificar autenticación en rutas siguientes
router.use(authMiddleware(true, true));

// @GET - /products/:id/edit
router.get('/:id/edit', productController.getEdit);

// @GET - /products/list
router.get('/list', productController.getList);

// @GET - /products/:id/detail
router.get('/:id/detail', productController.getDetail);

// @GET - /products/create
router.get('/create', productController.getCreate);

// @POST - /products
router.post('/', uploadFile.single('imageUpload'), productController.postProduct);

// @DELETE - /products/:id/delete
router.post('/:id/delete', productController.deleteProduct);

// @POST - /products/:id/edit
router.post('/:id/edit', uploadFile.single('imageUpload'), productController.updateProduct);

module.exports = router;
