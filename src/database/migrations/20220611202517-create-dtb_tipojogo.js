'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dtb_tipojogo', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nome: {
          type: Sequelize.STRING(200),
          allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
      win: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      loss: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      caminho_robo: {
        type: Sequelize.STRING(200),
      },
      caminho_robo_adm: {
        type: Sequelize.STRING(200),
      },
      status_robo_adm: {
        type: Sequelize.STRING(200),
        defaultValue: "I", //A - ativo // I- inativo
      },
      link_acesso: {
        type: Sequelize.STRING(200),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }, 
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }, 
      

   });
   
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('dtb_tipojogo');
  }
};
