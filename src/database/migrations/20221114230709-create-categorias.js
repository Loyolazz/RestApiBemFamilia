'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('categorias', {
       id: {
        type: Sequelize.INTEGER,            // numero
        primaryKey: true,                  //key primeira
        autoIncrement: true,               //adiciona o id automatico
        allowNull: false             //nao pode ser nulo
       },
       nome: {
        type: Sequelize.STRING,            //letra
        allowNull: false,
       },
       subcategoria: {
        type: Sequelize.STRING,            
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

    await queryInterface.dropTable('categorias');

  }
};
