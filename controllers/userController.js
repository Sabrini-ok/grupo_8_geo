const path = require('path');
const userModel = require('../models/userModels');
const { validationResult } = require('express-validator');

const controller = {
    
    register: (req, res) => {
        return res.render('register');
    },

    processRegister: (req, res) => {
        return res.send (req.body)
    },

    login: (req, res) => {
        return res.render('login');
    },
    profile: (req, res) => {
        return res.render ('profile');
    }
}

module.exports = controller;