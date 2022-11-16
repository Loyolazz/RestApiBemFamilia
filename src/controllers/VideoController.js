const Video = require('../models/Video');
const Categoria = require('../models/Categoria');

module.exports = {

    async list(req, res) {
        const { categoria_id } = req.params;
        const categoria = await Categoria.findByPk(categoria_id, {
            include: { association: 'videos', through:{ attributes: []}}
        })
        if(!categoria) {
            return res.status(400).json({ error: 'Categoria não encontrada!' });
        }

        return res.json(categoria.videos)

    },


    async index(req, res) {
        const { id } = req.params;

        const video = await Video.findByPk(id);
        if(!video) {
            return res.status(400).json({ error: 'Video não encontrado!' });
        }
                  
        const listVideo = await Video.findOne({                          
            where: { id }
        });

        return res.json(listVideo);

    },


    async store(req, res) {
        const { categoria_id } = req.params;
        const { titulo, descricao, localizacao, url, ativo } = req.body;

        const categoria = await Categoria.findByPk(categoria_id);

        if(!categoria) {
            return res.status(400).json({ error: 'Categoria não encontrada' });
        }
                                //PROCURA E SE NAO EXISTIR ELE VAI CRIAR
        const [ video ] = await Video.findOrCreate({                          
            where: { titulo, descricao, localizacao, url, ativo }
        });

        await categoria.addVideo(video);

        return res.json(video);
    },

    async delete(req, res) {
        const { categoria_id } = req.params;
        const { titulo, descricao, localizacao, url, ativo } = req.body;

        const categoria = await Categoria.findByPk(categoria_id);

        if(!categoria) {
            return res.status(400).json({ error: 'Categoria não encontrada' });
        }

        const video = await Video.findOne({                          
            where: { titulo, descricao, localizacao, url, ativo }
        });

        await categoria.removeVideo(video)

        return res.json();
    },

    async update(req, res) {
        const { id } = req.params;
        const { categoria_id } = req.params;
        const { titulo, descricao, localizacao, url, ativo } = req.body;

        const categoria = await Categoria.findByPk(categoria_id);
        if(!categoria) {
            return res.status(400).json({ error: 'Categoria não encontrada!' });
        }

        const video = await Video.findByPk(id);
        if(!video) {
            return res.status(400).json({ error: 'Video não encontrado!' });
        }
                                
        await Video.update({ titulo:titulo, descricao:descricao, localizacao:localizacao, url:url, ativo:ativo},
            {where: {id: id} });

        return res.status(200).json({ mensagem: 'Video alterado com sucesso!' });
    },
}