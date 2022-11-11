const { Op } = require("sequelize");
const User = require("../models/User");

module.exports = {
  async show(req, res) {
    const users = await User.findAll({
      attributes: ["name", "email"],
      where: {
        email: {
          [Op.iLike]: "%@rocketseat.com.br", //descarta todo o texto antes do @
        },
      },
      include: [
        {
          association: "addresses",
          where: {
            street: "Rua Guilherme Gembala",
          },
        }, //retorna só o nome das ruas
        {
          association: "tech",
          required: false,
          where: {
            nome: {
              [Op.iLike]: "React%", //descarta todo o texto depois do %
            },
          },
        }, //tecnologia
      ],
    });
    return res.json(users);
  },
};
