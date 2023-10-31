const {DataTypes } = require("sequelize");
const sequelize = require ('../connection')

const Product = sequelize.define ('productos', {
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

    category: {
        type: DataTypes.STRING  
    },

    image: {
        type: DataTypes.STRING  
    }
}
, {
    timestamps: false
}
)

module.exports = Product