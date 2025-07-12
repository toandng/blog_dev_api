"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get existing post IDs
    const posts = await queryInterface.sequelize.query(
      "SELECT id FROM posts ORDER BY id ASC",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const topics = [];
    const topicNames = [
      "Web Development",
      "Mobile Development",
      "Data Science",
      "Machine Learning",
      "Artificial Intelligence",
      "Cybersecurity",
      "DevOps",
      "Cloud Computing",
      "Blockchain",
      "IoT",
      "Game Development",
      "UI/UX Design",
      "Product Management",
      "Startup",
      "Entrepreneurship",
      "Career Development",
      "Remote Work",
      "Programming Languages",
      "Frameworks",
      "Databases",
    ];

    for (const topicName of topicNames) {
      topics.push({
        name: topicName,
        slug: faker.helpers.slugify(topicName).toLowerCase(),
        image: faker.datatype.boolean() ? faker.image.url() : null,
        description: faker.lorem.paragraphs(2),
        post_count: faker.number.int({ min: 0, max: 50 }),
        post_id:
          posts.length > 0
            ? faker.datatype.boolean()
              ? faker.helpers.arrayElement(posts).id
              : null
            : null,
        created_at: faker.date.past({ years: 1 }),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("topics", topics, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("topics", null, {});
  },
};
