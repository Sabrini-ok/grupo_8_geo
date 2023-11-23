const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');
const searchController = require('../controllers/searchController');

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

// @GET - /product/cart
router.get('/cart', authMiddleware(false), productController.cart);

router.get('/search', searchController.searchProducts)

// @GET - /product/destacados
router.get('/destacados', productController.getDestacados);

// @GET - /product/:id/detail
router.get('/:id/detail', authMiddleware(false, false), productController.getDetail);

// Middleware para verificar autenticación en rutas siguientesss
router.use(authMiddleware(true, true));

// @GET - /product/:id/edit
router.get('/:id/edit', productController.getEdit);

// @GET - /product/list
router.get('/list', productController.getList);

// @GET - /product/create
router.get('/create', productController.getCreate);

// @POST - /product
router.post('/', uploadFile.single('imageUpload'), productController.postProduct);

// @DELETE - /product/:id/delete
router.post('/:id/delete', productController.deleteProduct);

// @POST - /product/:id/edit
router.post('/:id/edit', uploadFile.single('imageUpload'), productController.updateProduct);

module.exports = router;
