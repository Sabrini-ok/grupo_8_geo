
const path = require('path');

const controller = {
    productDetail: (req, res) => {
        res.render('productDetail');
    },
    cart: (req, res) => {
        res.render('productCart');
    }
}


module.exports = controller;