const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/img/avatars');
    },
    filename: (req, file, callback) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        callback(null, fileName);
    }
});

const uploadFile = multer({ storage });

// Validaciones para los datos del usuario
const validations = [
    body('userName').notEmpty().withMessage('Escribí tu nombre por favor'),
    body('email')
        .notEmpty().withMessage('Escribí tu email por favor').bail()
        .isEmail().withMessage('El formato de correo electrónico es inválido'),
    body('userPassword').notEmpty().withMessage('Usá al menos 8 dígitos e incluí al menos un carácter especial'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

        if (!file) {
            throw new Error('Subí una imagen por favor');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(',')}`);
            }
        }
        return true;
    }),
    body('gender').notEmpty().withMessage('Seleccioná una opción por favor'),
];

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const unauthMiddleware = require('../middlewares/unauthMiddleware');

// @GET - /user/login
router.get('/login', unauthMiddleware, userController.login);

// @POST - /user/login
router.post('/login', userController.loginPost);

// @GET - /user/logout
router.get('/logout', authMiddleware(true, false), userController.logout);

// @GET - /user/register
router.get('/register', unauthMiddleware, userController.register);

// @GET - /user/
router.get('/', authMiddleware(true, true), userController.getUsers);

// @GET - /user/list
router.get('/list', uploadFile.single('avatar'), userController.getList);

// @POST - /user/register
router.post('/register', uploadFile.single('avatar'), validations, userController.processRegister);

// @GET - /user/profile/
router.get('/profile/', authMiddleware(true, false), userController.profile);

// @GET - /user/:id/edit
router.get('/:id/edit', userController.getEdit);

// @POST - /user/:id/delete
router.post('/:id/delete', userController.deleteUser);

// @POST - /user/:id/edit
router.post('/:id/edit', uploadFile.single('imageUpload'), userController.updateUser);

module.exports = router;
