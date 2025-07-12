"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posts", {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      meta_title: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      meta_description: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      thumbnail: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      cover: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      status: {
        type: Sequelize.STRING(50),
        defaultValue: "draft",
      },
      visibility: {
        type: Sequelize.STRING(50),
        defaultValue: "public",
      },
      content: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      slug: {
        type: Sequelize.STRING(255),
        unique: true,
      },
      view_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      like_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      public_at: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("posts");
  },
};
