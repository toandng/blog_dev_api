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
      throw new Error("Users and posts must exist before creating likes.");
    }

    const likes = [];
    const likeSet = new Set();
    const likeableTypes = ["Post", "Comment"];

    // Create likes for posts
    for (let i = 0; i < 300; i++) {
      const userId = faker.helpers.arrayElement(users).id;
      const likeableType = faker.helpers.arrayElement(likeableTypes);
      let likeableId;

      if (likeableType === "Post") {
        likeableId = faker.helpers.arrayElement(posts).id;
      } else {
        // For comments, we'll use random IDs (assuming comments will exist)
        likeableId = faker.number.int({ min: 1, max: 200 });
      }

      const likeKey = `${userId}-${likeableType}-${likeableId}`;

      if (!likeSet.has(likeKey)) {
        likeSet.add(likeKey);

        likes.push({
          user_id: userId,
          likeable_type: likeableType,
          likeable_id: likeableId,
          created_at: faker.date.past({ years: 1 }),
          updated_at: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert("likes", likes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("likes", null, {});
  },
};
