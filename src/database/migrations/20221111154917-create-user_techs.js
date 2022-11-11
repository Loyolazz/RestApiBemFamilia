'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('user_techs', {
       id: {
        type: Sequelize.INTEGER,            // numero
        primaryKey: true,                  //key primeira
        autoIncrement: true,               //adiciona o id automatico
        allowNull: false             //nao pode ser nulo
       },
       user_id: {
        type: Sequelize.INTEGER,            
        allowNull: false,
        references: {model: 'users', key: 'id'},    //FAZ UMA REFERENCIA COM A OUTRA TABELA (chave estrangeira)
        onUpdate: 'CASCADE',               //SE ATUALIZAR O ID ELE ATUALIZA TBM
        onDelete: 'CASCADE',                  //SE FOR DELETADO O ID ELE DELETADA TBM
       },
       tech_id: {
        type: Sequelize.INTEGER,            
        allowNull: false,
        references: {model: 'techs', key: 'id'},    //FAZ UMA REFERENCIA COM A OUTRA TABELA (chave estrangeira)
        onUpdate: 'CASCADE',               //SE ATUALIZAR O ID ELE ATUALIZA TBM
        onDelete: 'CASCADE',                  //SE FOR DELETADO O ID ELE DELETADA TBM
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

    await queryInterface.dropTable('user_techs');

  }
};
