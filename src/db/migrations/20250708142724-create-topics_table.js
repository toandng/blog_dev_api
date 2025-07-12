/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("topics", {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        defaultValue: null,
      },
      slug: {
        type: Sequelize.STRING(255),
        unique: true,
      },
      image: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      description: {
        type: Sequelize.TEXT,
      },
      post_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      post_id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        references: {
          model: "posts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("topics");
  },
};
