"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get existing post and tag IDs
    const posts = await queryInterface.sequelize.query(
      "SELECT id FROM posts ORDER BY id ASC",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const tags = await queryInterface.sequelize.query(
      "SELECT id FROM tags ORDER BY id ASC",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (posts.length === 0 || tags.length === 0) {
      throw new Error(
        "Posts and tags must exist before creating tag-post relationships."
      );
    }

    const tagPosts = [];
    const relationshipSet = new Set();

    // Each post should have 1-5 tags
    for (const post of posts) {
      const numberOfTags = faker.number.int({ min: 1, max: 5 });
      const selectedTags = faker.helpers.arrayElements(tags, numberOfTags);

      for (const tag of selectedTags) {
        const relationshipKey = `${post.id}-${tag.id}`;

        if (!relationshipSet.has(relationshipKey)) {
          relationshipSet.add(relationshipKey);

          tagPosts.push({
            post_id: post.id,
            tag_id: tag.id,
            created_at: faker.date.past({ years: 1 }),
            updated_at: new Date(),
          });
        }
      }
    }

    await queryInterface.bulkInsert("tag_post", tagPosts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tag_post", null, {});
  },
};
