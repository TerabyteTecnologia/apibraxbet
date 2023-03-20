'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dtb_estrategia_miner', { 
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

    espera: {
        type: Sequelize.INTEGER,
        allowNull: false,
     },
     tentativas: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      minas_a: {
          type: Sequelize.INTEGER,
      },
      minas_b: {
          type: Sequelize.INTEGER,
      },
      entrada_a: {
        type: Sequelize.INTEGER,
      },
      entrada_b: {
        type: Sequelize.INTEGER,
      },
      win: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      loss: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable('dtb_estrategia_miner');
  }
};
