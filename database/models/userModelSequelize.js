const {DataTypes } = require("sequelize");
const sequelize = require ('../connection')

const User = sequelize.define ('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, // Asegúrate de que no sea nula
    },

    admin: {
      type: DataTypes.BOOLEAN  
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
    timestamps: false,
    freezeTableName: true
}

)

module.exports = User