const Perfil = require('../models/Perfil');
const Usuario = require('../models/Usuario');

module.exports = {

    async index(req, res) {
        const { usuario_id } = req.params;

        const usuario = await Usuario.findByPk(usuario_id, {
            include: {association: 'perfils'}
        });

        return res.json(usuario);

    },

    async store(req, res) {
        const { usuario_id } = req.params;
        const { nome, ativo } = req.body;

        const usuario = await Usuario.findByPk(usuario_id);

        if (!usuario) {
            return res.status(400).json({ error: 'Usuario não encontrado!' });
        }

        const perfil = await Perfil.create({
            nome, 
            ativo,
            usuario_id,
        })

        return res.json(perfil);

    }
}