"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING(50),
      },
      last_name: {
        type: Sequelize.STRING(50),
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        defaultValue: null,
      },
      password: {
        type: Sequelize.STRING(100),
        defaultValue: null,
      },
      two_factor_enable: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0,
      },
      two_factor_secret: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      user_name: {
        type: Sequelize.STRING(50),
        unique: true,
        defaultValue: null,
      },
      avatar: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      title: {
        type: Sequelize.STRING(100),
      },
      about: {
        type: Sequelize.TEXT,
      },
      followers_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      following_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      like_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      address: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      website_url: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      twitter_url: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      github_url: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      linkedin_url: {
        type: Sequelize.STRING(255),
        defaultValue: null,
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
    await queryInterface.dropTable("users");
  },
};
