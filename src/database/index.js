//Onde usamos o sequelize para falzer a conecao com o banco

const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuario');
const Perfil = require('../models/Perfil');
const Video = require('../models/Video');
const Categoria = require('../models/Categoria');
const Favorito = require('../models/Favorito');

const connection = new Sequelize(dbConfig);

Usuario.init(connection);
Perfil.init(connection);
Categoria.init(connection);
Video.init(connection);


Usuario.associate(connection.models);
Perfil.associate(connection.models);
Categoria.associate(connection.models);
Video.associate(connection.models);


module.exports = connection;