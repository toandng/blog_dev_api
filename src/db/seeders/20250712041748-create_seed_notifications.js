"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const notifications = [];
    const types = [
      "like",
      "comment",
      "follow",
      "mention",
      "post_published",
      "system",
    ];
    const notifiableTypes = ["Post", "Comment", "User", "System"];

    for (let i = 0; i < 200; i++) {
      const type = faker.helpers.arrayElement(types);
      let title;

      switch (type) {
        case "like":
          title = "Someone liked your post";
          break;
        case "comment":
          title = "New comment on your post";
          break;
        case "follow":
          title = "You have a new follower";
          break;
        case "mention":
          title = "You were mentioned in a post";
          break;
        case "post_published":
          title = "Your post has been published";
          break;
        case "system":
          title = faker.helpers.arrayElement([
            "System maintenance scheduled",
            "New feature available",
            "Security update completed",
            "Welcome to the platform!",
          ]);
          break;
        default:
          title = "You have a new notification";
      }

      notifications.push({
        type: type,
        title: title,
        notifiable_type: faker.helpers.arrayElement(notifiableTypes),
        notifiable_id: faker.number.int({ min: 1, max: 100 }),
        created_at: faker.date.past({ years: 1 }),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("notifications", notifications, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("notifications", null, {});
  },
};
