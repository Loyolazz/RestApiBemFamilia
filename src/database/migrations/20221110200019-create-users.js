'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('users', {
       id: {
        type: Sequelize.INTEGER,            // numero
        primaryKey: true,                  //key primeira
        autoIncrement: true,               //adiciona o id automatico
        allowNull: false             //nao pode ser nulo
       },
       name: {
        type: Sequelize.STRING,            //letra
        allowNull: false,
       },
       email: {
        type: Sequelize.STRING,            
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

    //await queryInterface.dropTable('users');

  }
};
