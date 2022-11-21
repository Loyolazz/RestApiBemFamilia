const Usuario = require("../models/Usuario");
const Yup = require("yup");
const { response } = require("express");

module.exports = {

  async index(req, res) {
    const { page = 1 } = req.query;

    const usuario = await Usuario.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(usuario);
  },


  async show(req, res) {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    return res.json(usuario);
  },


  async store(req, res) {
    const schema = Yup.object()
      .shape({
        nome: Yup.string().required().max(70),
        email: Yup.string().email().required().max(120),
        login: Yup.string().required().max(20),
        senha: Yup.string().required().min(8),
      })
      .noUnknown();

    try {
      const emailExists = await Usuario.findOne({
        where: {
          email: req.body.email,
        },
      });
      const loginExists = await Usuario.findOne({
        where: {
          login: req.body.login,
        },
      });

      if (emailExists || loginExists) {
        return res.status(409).json({ error: "Usuario já cadastrado" });
      }
      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const { id, nome, email, login, ativo, is_admin } = await Usuario.create(
        validFields
      );

      return res.json({ id, nome, email, login, ativo, is_admin });
    } catch (error) {
      return res.status(400).json(error);
    }
  },


  async update(req, res) {
    const schema = Yup.object()
      .shape({
        nome: Yup.string().max(70),
        senha: Yup.string().min(8),
      })
      .noUnknown();

    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return response.status(400).json({ error: "Usuário não encontrado" });
     
    }
      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const { nome } = await Usuario.update(validFields);
      
      return res.json({ nome });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
