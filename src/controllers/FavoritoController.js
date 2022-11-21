const Categoria = require('../models/Categoria');
const Usuario = require('../models/Usuario');
const Video = require('../models/Video');


module.exports = {


    async index(req, res) {
        const favoritos = await Video.findAll({
            include: 
                [{
                  association: "usuarios",
                  where: {
                    id: req.usuario_id
                  }

                }]
                  
        });

        return res.json(favoritos);

    },


    async store(req, res) {
        const { video_id } = req.params;

        const video = await Video.findByPk({ video_id });
        if(!video) {
            return res.status(400).json({ error: 'Video não encontrado' });
        }
        await video.addUsuario(req.usuario_id)

        return res.json({mensagem: 'Video favoritado com sucesso'});

    },


    async delete(req, res) {
        const { id } = req.params;

        const categoria = await Categoria.findByPk(id);
        if(!categoria) {
            return res.status(400).json({ error: 'Categoria não encontrada!' });
        }

        const delcategoria = await Categoria.findOne({                          
            where: { id }
        });

        await categoria.destroy(delcategoria)

        return res.status(200).json({ mensagem: 'Categoria deletada com sucesso!' });;
    },

    async update(req, res) {
        const { id } = req.params;
        const { nome, subcategoria, ativo} = req.body;

        const categoria = await Categoria.findByPk(id);
        if(!categoria) {
            return res.status(400).json({ error: 'Categoria não encontrada!' });
        }

        await Categoria.update({ nome:nome, subcategoria:subcategoria, ativo:ativo},
            {where: {id: id} });

        return res.status(200).json({ mensagem: 'Categoria alterada com sucesso!' });



    }

};