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
      throw new Error("Users and posts must exist before creating bookmarks.");
    }

    const bookmarks = [];
    const bookmarkSet = new Set();

    // Create bookmarks - each user bookmarks 3-10 posts
    for (const user of users) {
      const numberOfBookmarks = faker.number.int({ min: 3, max: 10 });
      const selectedPosts = faker.helpers.arrayElements(
        posts,
        numberOfBookmarks
      );

      for (const post of selectedPosts) {
        const bookmarkKey = `${user.id}-${post.id}`;

        if (!bookmarkSet.has(bookmarkKey)) {
          bookmarkSet.add(bookmarkKey);

          bookmarks.push({
            user_id: user.id,
            post_id: post.id,
            created_at: faker.date.past({ years: 1 }),
            updated_at: new Date(),
          });
        }
      }
    }

    await queryInterface.bulkInsert("bookmarks", bookmarks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("bookmarks", null, {});
  },
};
