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
      throw new Error("Users must exist before creating user settings.");
    }

    const userSettings = [];

    // Create settings for each user
    for (const user of users) {
      const settingsData = {
        theme: faker.helpers.arrayElement(["light", "dark", "auto"]),
        language: faker.helpers.arrayElement([
          "en",
          "vi",
          "fr",
          "es",
          "de",
          "ja",
          "ko",
        ]),
        timezone: faker.location.timeZone(),
        notifications: {
          email: faker.datatype.boolean(),
          push: faker.datatype.boolean(),
          sms: faker.datatype.boolean(),
          marketing: faker.datatype.boolean(),
        },
        privacy: {
          profileVisibility: faker.helpers.arrayElement([
            "public",
            "private",
            "friends",
          ]),
          showEmail: faker.datatype.boolean(),
          showPhone: faker.datatype.boolean(),
          allowMessages: faker.datatype.boolean(),
        },
        preferences: {
          autoPlay: faker.datatype.boolean(),
          showThumbnails: faker.datatype.boolean(),
          compactMode: faker.datatype.boolean(),
          showOnlineStatus: faker.datatype.boolean(),
        },
        security: {
          twoFactorEnabled: faker.datatype.boolean(),
          loginNotifications: faker.datatype.boolean(),
          sessionTimeout: faker.number.int({ min: 15, max: 480 }), // minutes
        },
      };

      userSettings.push({
        user_id: user.id,
        data: JSON.stringify(settingsData),
        created_at: faker.date.past({ years: 1 }),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("user_settings", userSettings, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_settings", null, {});
  },
};
