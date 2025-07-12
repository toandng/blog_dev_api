"use strict";

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    for (let i = 0; i < 50; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const hashedPassword = await bcrypt.hash("password123", 10);

      users.push({
        first_name: firstName,
        last_name: lastName,
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        password: hashedPassword,
        two_factor_enable: faker.datatype.boolean() ? 1 : 0,
        two_factor_secret: faker.datatype.boolean()
          ? faker.string.alphanumeric(32)
          : null,
        user_name: faker.internet
          .userName({ firstName, lastName })
          .toLowerCase(),
        avatar: faker.datatype.boolean() ? faker.image.avatar() : null,
        title: faker.person.jobTitle(),
        about: faker.lorem.paragraphs(2),
        followers_count: faker.number.int({ min: 0, max: 1000 }),
        following_count: faker.number.int({ min: 0, max: 500 }),
        like_count: faker.number.int({ min: 0, max: 2000 }),
        address: faker.location.streetAddress(true),
        website_url: faker.datatype.boolean() ? faker.internet.url() : null,
        twitter_url: faker.datatype.boolean()
          ? `https://twitter.com/${faker.internet.userName()}`
          : null,
        github_url: faker.datatype.boolean()
          ? `https://github.com/${faker.internet.userName()}`
          : null,
        linkedin_url: faker.datatype.boolean()
          ? `https://linkedin.com/in/${faker.internet.userName()}`
          : null,
        created_at: faker.date.past({ years: 2 }),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
