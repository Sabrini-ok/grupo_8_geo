
const path = require('path');

const controller = {
    productDetail: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/productDetail.html'));
    },
    cart: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/productCart.html'));
    }
}


module.exports = controller;