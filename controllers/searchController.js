const Product = require('../database/models/productModelSequelize');
const { Op } = require('sequelize');

const searchProducts = async (req, res) => {
    try {
        const query = req.query.query;

        const results = await Product.findAll({
            where: {
                productName: {
                    [Op.like]: `%${query}%`
                }
            }
        });

        res.render('search', { results });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = {
    searchProducts
};
