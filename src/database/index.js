//Onde usamos o sequelize para falzer a conecao com o banco

const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Address = require('../models/Address');
const Tech = require('../models/Tech');
const Usuario = require('../models/Usuario');
const Perfil = require('../models/Perfil');

const connection = new Sequelize(dbConfig);

User.init(connection);
Address.init(connection);
Tech.init(connection);
Usuario.init(connection);
Perfil.init(connection);

User.associate(connection.models);
Address.associate(connection.models);
Tech.associate(connection.models);
Usuario.associate(connection.models);
Perfil.associate(connection.models);

module.exports = connection;