
const path = require('path');

const controller = {
    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/register'));
    },
    login: (req, res) => {
        res.render(path.resolve(__dirname, '../views/login'));
    }
}


module.exports = controller;