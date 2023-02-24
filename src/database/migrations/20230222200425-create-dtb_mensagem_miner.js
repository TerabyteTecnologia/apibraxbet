'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dtb_mensagem_miner', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      bot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'dtb_bots', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      atencao: {
          type: Sequelize.TEXT,
          allowNull: false,
      },
      confirmacao: {
        type: Sequelize.TEXT,
        allowNull: false,
     },
      parcial:{
        type: Sequelize.TEXT,
      },
      final:{
        type: Sequelize.TEXT,
      },
      padrao_entrada:{
        type:Sequelize.INTEGER, // 0- inativo 1-Ativo
        defaultValue: 1,
      },
      padrao_nao_entrada:{
        type:Sequelize.INTEGER, // 0- inativo 1-Ativo
        defaultValue: 1,
      },
      statusparcialfinal:{
        type:Sequelize.INTEGER, // 0- inativo 1-Ativo
        defaultValue: 1,
      },


      
      //Padrao
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
      //fim padrao
      
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
    await queryInterface.dropTable('dtb_mensagem_miner');
  }
};
