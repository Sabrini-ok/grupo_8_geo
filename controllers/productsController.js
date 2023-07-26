const path = require('path');

const controller = {
    productDetail: (req, res) => {
        const productId = req.params.id;

        // console.log(productId);
        res.render('productDetail');
    },
    cart: (req, res) => {
        res.render('productCart');
    }
}


module.exports = controller;