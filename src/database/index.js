//Onde usamos o sequelize para falzer a conecao com o banco

const Sequelize = require('sequelize');
const dbConfig = require('../config/database')

const connection = new Sequelize(dbConfig);

module.exports = connection;