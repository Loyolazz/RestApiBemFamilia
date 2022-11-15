'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('videos', {
       id: {
        type: Sequelize.INTEGER,            // numero
        primaryKey: true,                  //key primeira
        autoIncrement: true,               //adiciona o id automatico
        allowNull: false             //nao pode ser nulo
       },
       titulo: {
        type: Sequelize.STRING,            //letra
        allowNull: false,
       },
       descricao: {
        type: Sequelize.STRING,            //letra
       },
       localizacao: {
        type: Sequelize.STRING,            //letra
        allowNull: false,
       },
       url: {
        type: Sequelize.STRING,            //letra
        allowNull: false,
       },
       ativo: {
        type: Sequelize.BOOLEAN,            
        allowNull: false,
       },
       created_at: {
        type: Sequelize.DATE,            
        allowNull: false,
       },
       updated_at: {
        type: Sequelize.DATE,            
        allowNull: false,
       },
      });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('videos');

  }
};
