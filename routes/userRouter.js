
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
    body('userName').notEmpty(),
    body('email').notEmpty(),
    body('userPassword').notEmpty(),
    body('avatar').notEmpty(),
    body('gender').notEmpty(),
]

const userController = require('../controllers/userController');


router.get('/login', userController.login);

router.get('/register', userController.register);

router.post('/register', uploadFile.single('avatar'), validations, userController.processRegister);

router.get('/profile/:id', userController.profile);


module.exports = router;