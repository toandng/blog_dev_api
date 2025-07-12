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
      title: {
        type: DataTypes.STRING(255),
      },
      description: {
        type: DataTypes.TEXT,
      },
      meta_title: {
        type: DataTypes.STRING(255),
      },
      meta_description: {
        type: DataTypes.TEXT,
      },
      thumbnail: {
        type: DataTypes.STRING(255),
      },
      cover: {
        type: DataTypes.STRING(255),
      },
      status: {
        type: DataTypes.STRING(50),
        defaultValue: "draft",
      },
      visibility: {
        type: DataTypes.STRING(50),
        defaultValue: "public",
      },
      content: {
        type: DataTypes.TEXT,
      },
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
      public_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "posts",
      underscored: true,
      timestamps: true,
    }
  );

  Post.associate = (db) => {
    // Post belongs to user
    Post.belongsTo(db.User, {
      foreignKey: "user_id",
      as: "author",
    });

    // Post has many comments
    Post.hasMany(db.Comment, {
      foreignKey: "post_id",
      as: "comments",
    });

    // Post has many bookmarks
    Post.hasMany(db.Bookmark, {
      foreignKey: "post_id",
      as: "bookmarks",
    });

    // Post has one topic reference
    Post.hasOne(db.Topic, {
      foreignKey: "post_id",
      as: "topic",
    });

    // Post many-to-many with tags through tag_post
    Post.belongsToMany(db.Tag, {
      through: "TagPost",
      foreignKey: "post_id",
      otherKey: "tag_id",
      as: "tags",
    });

    // Polymorphic relationship with likes
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
