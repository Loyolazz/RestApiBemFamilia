const express = require('express');
const PerfilController = require('./controllers/PerfilController');
const UsuarioController = require('./controllers/UsuarioController');
const CategoriaController = require('./controllers/CategoriaController');
const VideoController = require('./controllers/VideoController');

const routes = express.Router();

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuarios', UsuarioController.store);

routes.get('/usuarios/:usuario_id/perfils', PerfilController.index);
routes.post('/usuarios/:usuario_id/perfils', PerfilController.store);

//CATEGORIAS
routes.get('/categorias', CategoriaController.index);
routes.post('/categorias', CategoriaController.store);
routes.delete('/categorias/:id', CategoriaController.delete);
routes.put('/categorias/:id', CategoriaController.update);

//VIDEOS
routes.get('/videos/:id', VideoController.index);
routes.get('/categorias/:categoria_id/videos', VideoController.list);
routes.post('/categorias/:categoria_id/videos', VideoController.store);
routes.delete('/categorias/:categoria_id/videos', VideoController.delete);
routes.put('/categorias/:categoria_id/videos/:id', VideoController.update);



module.exports = routes;