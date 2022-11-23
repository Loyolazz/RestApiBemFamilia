const Video = require("../models/Video");
const Yup = require("yup");

module.exports = {
   

    async store(req, res) {

        const schema = Yup.object().shape({
            pontuacao: Yup.number().required(),
            comentario: Yup.string(),
        }).noUnknown()

        try {
            const validFields = await schema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
              });

            const { video_id } = req.params;

            const videos = await Video.findByPk(video_id);

            if (!videos){
                return res.status(400).json({ error: 'Video não encontrado'})
            }

            await videos.addAvaliacao(req.UsuarioID);

            return res.json(videos);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error });
        }

    },

};
