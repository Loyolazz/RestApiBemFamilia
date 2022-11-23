const express = require('express');
const AvaliacaoController = require('./controllers/AvaliacaoController');
const UsuarioController = require('./controllers/UsuarioController');
const CategoriaController = require('./controllers/CategoriaController');
const VideoController = require('./controllers/VideoController');
const FavoritoController = require('./controllers/FavoritoController');
const AuthController = require('./controllers/AuthController');
const AuthMiddleware = require('./middlewares/AuthMiddleware');

const routes = express.Router();

//AUTENTICAR
routes.post('/auth', AuthController.create);
routes.post('/usuarios', UsuarioController.store);

routes.use(AuthMiddleware)

//USUARIO
routes.get('/usuarios', UsuarioController.index);
routes.get('/usuarios/:id', UsuarioController.show);
routes.put('/usuarios', UsuarioController.update);

//CATEGORIAS
routes.get('/categorias', CategoriaController.index);
routes.get('/categorias/:categoria_id', CategoriaController.list);
routes.post('/categorias', CategoriaController.store);
routes.delete('/categorias/:id', CategoriaController.delete);
routes.put('/categorias/:id', CategoriaController.update);

//VIDEOS
routes.get('/videos/:id', VideoController.index);
routes.post('/categorias/:categoria_id/videos', VideoController.store);
routes.delete('/categorias/:categoria_id/videos', VideoController.delete);
routes.put('/categorias/:categoria_id/videos/:id', VideoController.update);

//FAVORITOS
routes.get('/favoritos', FavoritoController.index);
routes.post('/favoritos/:video_id', FavoritoController.store);
routes.delete('/favoritos/:video_id', FavoritoController.delete);

//AVALIAÇÃO
routes.post('/avaliacoes/:video_id', AvaliacaoController.store);




module.exports = routes;