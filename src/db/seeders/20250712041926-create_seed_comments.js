"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get existing user and post IDs
    const users = await queryInterface.sequelize.query(
      "SELECT id FROM users ORDER BY id ASC",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const posts = await queryInterface.sequelize.query(
      "SELECT id FROM posts ORDER BY id ASC",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (users.length === 0 || posts.length === 0) {
      throw new Error("Users and posts must exist before creating comments.");
    }

    const comments = [];

    // Create parent comments first
    for (let i = 0; i < 150; i++) {
      comments.push({
        user_id: faker.helpers.arrayElement(users).id,
        post_id: faker.helpers.arrayElement(posts).id,
        parent_id: null,
        content: faker.lorem.paragraphs({ min: 1, max: 3 }),
        like_count: faker.number.int({ min: 0, max: 50 }),
        delete_at: faker.datatype.boolean({ probability: 0.05 })
          ? faker.date.past({ years: 1 })
          : null,
        created_at: faker.date.past({ years: 1 }),
        updated_at: new Date(),
      });
    }

    // Insert parent comments first
    await queryInterface.bulkInsert("comments", comments, {});

    // Insert parent comments first
    await queryInterface.bulkInsert("comments", comments, {});

    // Get inserted comment IDs for replies
    const parentComments = await queryInterface.sequelize.query(
      "SELECT id, post_id FROM comments WHERE parent_id IS NULL ORDER BY id ASC",
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Create reply comments
    const replyComments = [];
    for (let i = 0; i < 80; i++) {
      const parentComment = faker.helpers.arrayElement(parentComments);

      replyComments.push({
        user_id: faker.helpers.arrayElement(users).id,
        post_id: parentComment.post_id,
        parent_id: parentComment.id,
        content: faker.lorem.sentences({ min: 1, max: 2 }),
        like_count: faker.number.int({ min: 0, max: 20 }),
        delete_at: faker.datatype.boolean({ probability: 0.05 })
          ? faker.date.past({ years: 1 })
          : null,
        created_at: faker.date.past({ years: 1 }),
        updated_at: new Date(),
      });
    }

    // Insert reply comments
    await queryInterface.bulkInsert("comments", replyComments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
