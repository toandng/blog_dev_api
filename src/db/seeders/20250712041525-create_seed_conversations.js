"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const conversations = [];

    for (let i = 0; i < 30; i++) {
      conversations.push({
        name: faker.lorem.words({ min: 2, max: 5 }),
        avatar: faker.datatype.boolean() ? faker.image.avatar() : null,
        last_message_at: faker.date.recent({ days: 30 }),
        created_at: faker.date.past({ years: 1 }),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("conversations", conversations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("conversations", null, {});
  },
};
