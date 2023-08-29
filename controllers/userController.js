const path = require('path');
const userModel = require('../models/userModels');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')

const controller = {

    register: (req, res) => {
        return res.render('register');
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        return res.send ('No hay errores en el formulario, gracias por registrarte')

    },

    login: (req, res) => {
        const userInJson = userModel.findByEmail(req.body.email);

        if (!userInJson) {
            return res.redirect('login');
        }
            
        const validPw = bcrypt.compareSync(req.body.password, userInJson.password);

        if (validPw) {
            res.send('La contraseña coincide');
        } else {
            res.redirect('/user/login?error=El email o la contraseña son incorrectos');
        }

        
    },

    profile: (req, res) => {
        return res.render ('profile');
    }
}

module.exports = controller;