"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get existing user-conversation relationships
    const userConversations = await queryInterface.sequelize.query(
      "SELECT user_id, conversation_id FROM user_conversation ORDER BY conversation_id, user_id",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (userConversations.length === 0) {
      throw new Error(
        "User-conversation relationships must exist before creating messages."
      );
    }

    const messages = [];
    const messageTypes = ["text", "image", "file", "emoji"];

    // Group by conversation
    const conversationGroups = {};
    for (const uc of userConversations) {
      if (!conversationGroups[uc.conversation_id]) {
        conversationGroups[uc.conversation_id] = [];
      }
      conversationGroups[uc.conversation_id].push(uc.user_id);
    }

    // Create messages for each conversation
    for (const [conversationId, userIds] of Object.entries(
      conversationGroups
    )) {
      const messageCount = faker.number.int({ min: 5, max: 30 });

      for (let i = 0; i < messageCount; i++) {
        const messageType = faker.helpers.arrayElement(messageTypes);
        let content;

        switch (messageType) {
          case "text":
            content = faker.lorem.sentences({ min: 1, max: 3 });
            break;
          case "image":
            content = faker.image.url();
            break;
          case "file":
            content = `${faker.system.fileName()}.${faker.helpers.arrayElement([
              "pdf",
              "docx",
              "zip",
              "txt",
            ])}`;
            break;
          case "emoji":
            content = faker.helpers.arrayElement([
              "😀",
              "😂",
              "❤️",
              "👍",
              "🎉",
              "🔥",
              "💯",
              "🙌",
            ]);
            break;
          default:
            content = faker.lorem.sentence();
        }

        messages.push({
          user_id: faker.helpers.arrayElement(userIds),
          conversation_id: parseInt(conversationId),
          type: messageType,
          content: content,
          delete_at: faker.datatype.boolean({ probability: 0.1 })
            ? faker.date.past({ years: 1 })
            : null,
          created_at: faker.date.past({ years: 1 }),
          updated_at: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert("messages", messages, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("messages", null, {});
  },
};
