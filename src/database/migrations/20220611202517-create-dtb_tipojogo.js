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
      coleta_dados: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      nome_tabela: {
          type: Sequelize.STRING(200),
      },
      caminho_robo: {
        type: Sequelize.STRING(200),
      },
   
      link_acesso: {
        type: Sequelize.STRING(200),
      },
      tipo_jogo: {
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
