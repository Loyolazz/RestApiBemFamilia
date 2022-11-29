'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('perfils', {
      id: {
        type: Sequelize.INTEGER, // INTEGER = NUMERO / STRING = LETRA
        primaryKey: true, //KEY PRIMARIA
        autoIncrement: true, //ADICIONA O ID AUTOMATICO
        allowNull: false, //NAO PODE SER NULO
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }, //FAZ UMA REFERENCIA COM A OUTRA TABELA (chave estrangeira)
        onUpdate: 'CASCADE', //SE ATUALIZAR O ID ELE ATUALIZA TBM
        onDelete: 'CASCADE', //SE FOR DELETADO O ID ELE DELETADA TBM
      },
      nome: {
        type: Sequelize.STRING, //letra
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
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('perfils')
  },
}
