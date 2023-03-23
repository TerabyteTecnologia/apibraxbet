'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dtb_mensagem_padrao_premium', { 
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
      abertura: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      fechamento: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      atencao: {
          type: Sequelize.TEXT,
          allowNull: false,
      },
     win: {
          type: Sequelize.TEXT,
          allowNull: false,
      },
      loss: {
          type: Sequelize.TEXT,
      },
      parcial:{
        type: Sequelize.TEXT,
      },
      final:{
        type: Sequelize.TEXT,
      },
      statusparcialfinal:{
        type:Sequelize.INTEGER, // 0- inativo 1-Ativo
        defaultValue: 1,
      },



      tipomensagem:{
        type:Sequelize.INTEGER, //  1-free 2- vip  
        defaultValue: 1,
      },

      manhainicio:{
        type:Sequelize.STRING(200),   
        defaultValue: '09:00',
        allowNull: true,
      },
      manhafim:{
        type:Sequelize.STRING(200),   
        defaultValue: '12:00',
        allowNull: true,
      },

      tardeinicio:{
        type:Sequelize.STRING(200),   
        defaultValue: '13:00',
        allowNull: true,
      },
      tardefim:{
        type:Sequelize.STRING(200),   
        defaultValue: '16:00',
        allowNull: true,
      },

      noiteinicio:{
        type:Sequelize.STRING(200),   
        defaultValue: '19:00',
        allowNull: true,
      },
      noiteifim:{
        type:Sequelize.STRING(200),   
        defaultValue: '22:00',
        allowNull: true,
      },

      statusmanha:{
        type:Sequelize.INTEGER, // 0-inativo 1-ativo
        defaultValue: 1,
        allowNull: true,
      },

      statustarde:{
        type:Sequelize.INTEGER, // 0-inativo 1-ativo 
        defaultValue: 0,
        allowNull: true,
      },

      statusnoite:{
        type:Sequelize.INTEGER, // 0-inativo 1-ativo
        defaultValue: 0,
        allowNull: true,
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
      

   },{
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
   
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('dtb_mensagem_padrao_premium');
  }
};
