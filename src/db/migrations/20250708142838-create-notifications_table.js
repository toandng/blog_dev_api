"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("notifications", {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      title: {
        type: Sequelize.STRING(255),
      },
      notifiable_type: {
        type: Sequelize.STRING(100),
      },
      notifiable_id: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("notifications");
  },
};
