const express = require('express');
const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const TechController = require('./controllers/TechController');
const ReportController = require('./controllers/ReportController');
const PerfilController = require('./controllers/PerfilController');
const UsuarioController = require('./controllers/UsuarioController');
const CategoriaController = require('./controllers/CategoriaController');
const VideoController = require('./controllers/VideoController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/users/:user_id/addresses', AddressController.index);
routes.post('/users/:user_id/addresses', AddressController.store);

routes.get('/users/:user_id/techs', TechController.index);
routes.post('/users/:user_id/techs', TechController.store);
routes.delete('/users/:user_id/techs', TechController.delete);

routes.get('/report', ReportController.show);

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuarios', UsuarioController.store);

routes.get('/usuarios/:usuario_id/perfils', PerfilController.index);
routes.post('/usuarios/:usuario_id/perfils', PerfilController.store);


routes.get('/categorias', CategoriaController.index);
routes.post('/categorias', CategoriaController.store);


routes.get('/categorias/:categoria_id/videos', VideoController.index);
routes.post('/categorias/:categoria_id/videos', VideoController.store);
routes.delete('/categorias/:categoria_id/videos', VideoController.delete);


module.exports = routes;