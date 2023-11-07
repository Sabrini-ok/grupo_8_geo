const {DataTypes } = require("sequelize");
const sequelize = require ('../connection');

const Category = sequelize.define ('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, 
    },

    name: {
        type: DataTypes.STRING  
    },
}
, {
    timestamps: false,
    freezeTableName: true
}
)



module.exports = Category