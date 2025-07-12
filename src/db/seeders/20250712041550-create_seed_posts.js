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

    if (users.length === 0) {
      throw new Error("No users found. Please run users seed first.");
    }

    const posts = [];
    const statuses = ["draft", "published", "archived"];
    const visibilities = ["public", "private", "unlisted"];

    for (let i = 0; i < 100; i++) {
      const title = faker.lorem.sentence({ min: 3, max: 8 });
      const status = faker.helpers.arrayElement(statuses);
      const publicAt =
        status === "published" ? faker.date.past({ years: 1 }) : null;

      posts.push({
        user_id: faker.helpers.arrayElement(users).id,
        title: title,
        description: faker.lorem.paragraphs(1),
        meta_title: title,
        meta_description: faker.lorem.sentence({ min: 10, max: 20 }),
        thumbnail: faker.datatype.boolean() ? faker.image.url() : null,
        cover: faker.datatype.boolean() ? faker.image.url() : null,
        status: status,
        visibility: faker.helpers.arrayElement(visibilities),
        content: faker.lorem.paragraphs({ min: 3, max: 8 }),
        slug: faker.helpers.slugify(title).toLowerCase(),
        view_count: faker.number.int({ min: 0, max: 5000 }),
        like_count: faker.number.int({ min: 0, max: 500 }),
        public_at: publicAt,
        created_at: faker.date.past({ years: 1 }),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("posts", posts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
