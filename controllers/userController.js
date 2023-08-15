const path = require('path');
const userModel = require('../models/userModels');
const { validationResult } = require('express-validator');

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
        return res.render('login');
    },
    profile: (req, res) => {
        return res.render ('profile');
    }
}

module.exports = controller;