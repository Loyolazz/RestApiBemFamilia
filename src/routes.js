const express = require('express');
const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const TechController = require('./controllers/TechController');
const ReportController = require('./controllers/ReportController');
const PerfilController = require('./controllers/PerfilController');
const UsuarioController = require('./controllers/UsuarioController');

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


module.exports = routes;