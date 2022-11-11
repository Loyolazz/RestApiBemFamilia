'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('addresses', {
       id: {
        type: Sequelize.INTEGER,            // INTEGER = NUMERO / STRING = LETRA
        primaryKey: true,                  //KEY PRIMARIA
        autoIncrement: true,               //ADICIONA O ID AUTOMATICO
        allowNull: false             //NAO PODE SER NULO
       },
       user_id: {
        type: Sequelize.INTEGER,            
        allowNull: false,
        references: {model: 'users', key: 'id'},    //FAZ UMA REFERENCIA COM A OUTRA TABELA (chave estrangeira)
        onUpdate: 'CASCADE',               //SE ATUALIZAR O ID ELE ATUALIZA TBM
        onDelete: 'CASCADE',                  //SE FOR DELETADO O ID ELE DELETADA TBM
       },
       zipcode: {
        type: Sequelize.STRING,            //letra
        allowNull: false,
       },
       street: {
        type: Sequelize.STRING,            
        allowNull: false,
       },
       number: {
        type: Sequelize.INTEGER,           
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

    await queryInterface.dropTable('addresses');

  }
};
