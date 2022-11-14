const Usuario = require('../models/Usuario');


module.exports = {
    async index(req, res) {
        const usuario = await Usuario.findAll();
        return res.json(usuario);

    },


    async store(req, res) {
        const {nome, email, login, ativo } = req.body;

        const usuario = await Usuario.create({ nome, email, login, ativo });

        return res.json(usuario);

    }

};