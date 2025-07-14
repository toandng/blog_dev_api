module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      title: DataTypes.STRING(255),
      description: DataTypes.TEXT,
      meta_title: DataTypes.STRING(255),
      meta_description: DataTypes.TEXT,
      thumbnail: DataTypes.STRING(255),
      cover: DataTypes.STRING(255),
      status: {
        type: DataTypes.STRING(50),
        defaultValue: "draft",
      },
      visibility: {
        type: DataTypes.STRING(50),
        defaultValue: "public",
      },
      content: DataTypes.TEXT,
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      view_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      like_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      public_at: DataTypes.DATE,
    },
    {
      tableName: "posts",
      underscored: true,
      timestamps: true,
    }
  );

  Post.associate = (db) => {
    // ✅ Many-to-many with Topic (using alias: topics)
    Post.belongsToMany(db.Topic, {
      through: "post_topic",
      foreignKey: "post_id",
      otherKey: "topic_id",
      as: "topics",
    });

    Post.belongsTo(db.User, {
      foreignKey: "user_id",
      as: "user",
    });

    Post.hasMany(db.Comment, {
      foreignKey: "post_id",
      as: "comments",
    });

    Post.hasMany(db.Bookmark, {
      foreignKey: "post_id",
      as: "bookmarks",
    });

    Post.belongsToMany(db.Tag, {
      through: "TagPost",
      foreignKey: "post_id",
      otherKey: "tag_id",
      as: "tags",
    });

    Post.hasMany(db.Like, {
      foreignKey: "likeable_id",
      constraints: false,
      scope: {
        likeable_type: "Post",
      },
      as: "likes",
    });
  };

  return Post;
};
