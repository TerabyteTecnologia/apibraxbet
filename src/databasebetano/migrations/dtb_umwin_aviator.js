'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('dtb_umwin_aviator', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            seed: {
                type: Sequelize.STRING(200),
            },
            crash_point: {
                type: Sequelize.FLOAT,
            },
            created: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now')
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
        await queryInterface.dropTable('dtb_umwin_aviator');
    }
};