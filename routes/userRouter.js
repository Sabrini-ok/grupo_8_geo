const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const { body } = require('express-validator')

const storage = multer.diskStorage ({
    destination: (req, file, callback) => {
        callback(null,  './public/img/avatars')
    },

    filename: (req, file, callback) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        callback(null, fileName);
    }
})

const uploadFile = multer ({ storage })

const validations = [
    body('userName').notEmpty().withMessage('Escribí tu nombre por favor'),
    body('email')
        .notEmpty().withMessage('Escribí tu email por favor').bail()
        .isEmail().withMessage('El formato de correo electrónico es inválido'),
    body('userPassword').notEmpty().withMessage('Usá al menos 8 digitos e incluí al menos un caracter especial'),
    body('avatar').custom((value, { req }) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file){
            throw new Error ('Subí una imagen por favor')
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error (`Las extensiones permitidas son ${acceptedExtensions.join(',')}`);
            }
        }
        return true;
    }),
    body('gender').notEmpty().withMessage('Seleccioná una opción por favor'),
]

const userController = require('../controllers/userController');


router.get('/login', userController.login);

router.get('/register', userController.register);

router.post('/register', uploadFile.single('avatar'), validations, userController.processRegister);

router.get('/profile/:id', userController.profile);


module.exports = router;