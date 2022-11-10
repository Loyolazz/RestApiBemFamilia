//Onde usamos o sequelize para falzer a conecao com o banco

const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User')

const connection = new Sequelize(dbConfig);

User.init(connection);

module.exports = connection;