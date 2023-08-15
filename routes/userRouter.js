
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/userController');

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


router.get('/login', userController.login);

router.get('/register', userController.register);

router.post('/register', uploadFile.single('avatar'), userController.processRegister);

router.get('/profile/:id', userController.profile);


module.exports = router;