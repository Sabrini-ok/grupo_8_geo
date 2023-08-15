const path = require('path');

const controller = {
    register: (req, res) => {
        res.render('register');
    },
    login: (req, res) => {
        res.render('login');
    },
    profile: (req, res) => {
        return res.render ('profile');
    }
}

module.exports = controller;