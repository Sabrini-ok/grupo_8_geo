const {DataTypes } = require("sequelize");
const sequelize = require ('../connection')
const Category = require ('./categoryModelSequelize')

const Product = sequelize.define ('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, // Asegúrate de que no sea nula
    },

    productName: {
        field: 'product_name',
        type: DataTypes.STRING  
    },

    price: {
        type: DataTypes.STRING  
    },

    description: {
        type: DataTypes.STRING  
    },


    image: {
        type: DataTypes.STRING  
    }
}
, {
    timestamps: false,
    freezeTableName: true
}
)

Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product