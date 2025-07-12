"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get existing user and conversation IDs
    const users = await queryInterface.sequelize.query(
      "SELECT id FROM users ORDER BY id ASC",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const conversations = await queryInterface.sequelize.query(
      "SELECT id FROM conversations ORDER BY id ASC",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (users.length === 0 || conversations.length === 0) {
      throw new Error(
        "Users and conversations must exist before creating user-conversation relationships."
      );
    }

    const userConversations = [];
    const relationshipSet = new Set();

    // Each conversation should have 2-5 users
    for (const conversation of conversations) {
      const numberOfUsers = faker.number.int({ min: 2, max: 5 });
      const selectedUsers = faker.helpers.arrayElements(users, numberOfUsers);

      for (const user of selectedUsers) {
        const relationshipKey = `${user.id}-${conversation.id}`;

        if (!relationshipSet.has(relationshipKey)) {
          relationshipSet.add(relationshipKey);

          userConversations.push({
            user_id: user.id,
            conversation_id: conversation.id,
            created_at: faker.date.past({ years: 1 }),
            updated_at: new Date(),
          });
        }
      }
    }

    await queryInterface.bulkInsert("user_conversation", userConversations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_conversation", null, {});
  },
};
