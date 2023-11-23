const Product = require('../database/models/productModelSequelize');
const searchProducts = async (req, res) => {
    try {
        const query = req.query.query;

        const results = await Product.findAll({ name: { $regex: new RegExp(query, 'i') } });

        res.render('search', { results });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = {
    searchProducts 
}