'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dtb_estrategia_fantan', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      bot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'dtb_tipojogo', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nome: {
          type: Sequelize.STRING(200),
          allowNull: false,
      },
      sequencia: {
        type: Sequelize.STRING(200),
        allowNull: false,
     },
      apostar_em: {
          type: Sequelize.STRING(200),
      },
      martingale: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING(200),
        defaultValue: "I", //A - ativo // I- inativo
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
    await queryInterface.dropTable('dtb_estrategia_fantan');
  }
};
