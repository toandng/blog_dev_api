module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
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
      parent_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "comments",
          key: "id",
        },
      },
      content: {
        type: DataTypes.TEXT,
      },
      like_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      delete_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "comments",
      underscored: true,
      timestamps: true,
    }
  );

  Comment.associate = (db) => {
    // Comment belongs to user
    Comment.belongsTo(db.User, {
      foreignKey: "user_id",
      as: "user",
    });

    // Comment belongs to post
    Comment.belongsTo(db.Post, {
      foreignKey: "post_id",
      as: "post",
    });

    // Self-referencing for parent comment
    Comment.belongsTo(db.Comment, {
      foreignKey: "parent_id",
      as: "parent",
    });

    // Comment has many replies
    Comment.hasMany(db.Comment, {
      foreignKey: "parent_id",
      as: "replies",
    });

    // Polymorphic relationship with likes
    Comment.hasMany(db.Like, {
      foreignKey: "likeable_id",
      constraints: false,
      scope: {
        likeable_type: "Comment",
      },
      as: "likes",
    });
  };

  return Comment;
};
