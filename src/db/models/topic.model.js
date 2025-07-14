module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    "Topic",
    {
      name: {
        type: DataTypes.STRING(100),
      },
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      image: {
        type: DataTypes.STRING(255),
      },
      description: {
        type: DataTypes.TEXT,
      },
      post_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
      },
    },
    {
      tableName: "topics",
      underscored: true,
      timestamps: true,
    }
  );

  Topic.associate = (db) => {
    // Topic belongs to post
    Topic.belongsToMany(db.Post, {
      through: "post_topic",
      as: "posts",
    });
  };

  return Topic;
};
