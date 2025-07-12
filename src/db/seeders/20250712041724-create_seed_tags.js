"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tags = [];
    const techTags = [
      "javascript",
      "nodejs",
      "react",
      "vue",
      "angular",
      "python",
      "django",
      "flask",
      "php",
      "laravel",
      "mysql",
      "postgresql",
      "mongodb",
      "redis",
      "docker",
      "kubernetes",
      "aws",
      "azure",
      "gcp",
      "devops",
    ];
    const generalTags = [
      "programming",
      "web-development",
      "mobile-development",
      "data-science",
      "machine-learning",
      "artificial-intelligence",
      "cybersecurity",
      "blockchain",
      "startup",
      "entrepreneurship",
      "productivity",
      "career",
      "tutorial",
      "tips",
      "best-practices",
    ];

    const allTags = [...techTags, ...generalTags];

    // Add predefined tags
    for (const tagName of allTags) {
      tags.push({
        name: tagName,
        created_at: faker.date.past({ years: 1 }),
        updated_at: new Date(),
      });
    }

    // Add some random tags
    for (let i = 0; i < 15; i++) {
      tags.push({
        name: faker.lorem.word().toLowerCase(),
        created_at: faker.date.past({ years: 1 }),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("tags", tags, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tags", null, {});
  },
};
