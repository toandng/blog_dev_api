module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define(
    "Bookmark",
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
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
      tableName: "bookmarks",
      underscored: true,
      timestamps: true,
    }
  );

  Bookmark.associate = (db) => {
    // Bookmark belongs to user
    Bookmark.belongsTo(db.User, {
      foreignKey: "user_id",
      as: "user",
    });

    // Bookmark belongs to post
    Bookmark.belongsTo(db.Post, {
      foreignKey: "post_id",
      as: "post",
    });
  };

  return Bookmark;
};
