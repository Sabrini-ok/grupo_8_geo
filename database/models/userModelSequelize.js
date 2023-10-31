const {DataTypes } = require("sequelize");
const sequelize = require ('../connection')

const User = sequelize.define ('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, // Asegúrate de que no sea nula
    },

    fullName: {
        field: 'full_name',
        type: DataTypes.STRING  
    },

    email: {
        type: DataTypes.STRING  
    },

    gender: {
        type: DataTypes.STRING  
    },

    password: {
        type: DataTypes.STRING  
    },

    avatar: {
        type: DataTypes.STRING  
    },


}
, {
    timestamps: false
}

)

module.exports = User