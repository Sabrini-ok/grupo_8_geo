const Sequelize = require ("sequelize") 
const config = require ("./config/config.js")

const env = process.env.ENVIRONMENT
const dbconfiguration = config [env]
const sequelize = new Sequelize(dbconfiguration.database, dbconfiguration.username, dbconfiguration.password, {
    host: dbconfiguration.host,
    dialect: dbconfiguration.dialect
})


module.exports = sequelize