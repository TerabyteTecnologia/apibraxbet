'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dtb_estrategiapremium_crash', { 
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
      sair: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      aguardar: {
        type: Sequelize.INTEGER,
        allowNull: false,
     },
     notificar: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      lista: {
          type: Sequelize.INTEGER,
      },
      sair_em: {
          type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('dtb_estrategiapremium_crash');
  }
};
