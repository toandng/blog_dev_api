"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get existing user IDs
    const users = await queryInterface.sequelize.query(
      "SELECT id FROM users ORDER BY id ASC",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (users.length < 2) {
      throw new Error("Need at least 2 users to create follow relationships.");
    }

    const follows = [];
    const followPairs = new Set();

    // Create random follow relationships
    for (let i = 0; i < 150; i++) {
      let followingId, followedId;
      let pairKey;

      // Ensure we don't create duplicate follow relationships or self-follows
      do {
        followingId = faker.helpers.arrayElement(users).id;
        followedId = faker.helpers.arrayElement(users).id;
        pairKey = `${followingId}-${followedId}`;
      } while (followingId === followedId || followPairs.has(pairKey));

      followPairs.add(pairKey);

      follows.push({
        following_id: followingId,
        followed_id: followedId,
        created_at: faker.date.past({ years: 1 }),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("follows", follows, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("follows", null, {});
  },
};
