module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      first_name: {
        type: DataTypes.STRING(50),
      },
      last_name: {
        type: DataTypes.STRING(50),
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
      },
      two_factor_enable: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
      },
      two_factor_secret: {
        type: DataTypes.STRING(50),
      },
      user_name: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING(255),
      },
      title: {
        type: DataTypes.STRING(100),
      },
      about: {
        type: DataTypes.TEXT,
      },
      followers_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      following_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      like_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      address: {
        type: DataTypes.TEXT,
      },
      website_url: {
        type: DataTypes.STRING(255),
      },
      twitter_url: {
        type: DataTypes.STRING(255),
      },
      github_url: {
        type: DataTypes.STRING(255),
      },
      linkedin_url: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: "users",
      underscored: true,
      timestamps: true,
    }
  );

  User.associate = (db) => {
    // User has many posts
    User.hasMany(db.Post, {
      foreignKey: "user_id",
      as: "posts",
    });

    // User has many messages
    User.hasMany(db.Message, {
      foreignKey: "user_id",
      as: "messages",
    });

    // User has many likes
    User.hasMany(db.Like, {
      foreignKey: "user_id",
      as: "likes",
    });

    // User has many bookmarks
    User.hasMany(db.Bookmark, {
      foreignKey: "user_id",
      as: "bookmarks",
    });

    // User has many comments
    User.hasMany(db.Comment, {
      foreignKey: "user_id",
      as: "comments",
    });

    // User has one user_settings
    User.hasOne(db.UserSetting, {
      foreignKey: "user_id",
      as: "settings",
    });

    // User many-to-many with conversations through user_conversation
    User.belongsToMany(db.Conversation, {
      through: "UserConversation",
      foreignKey: "user_id",
      otherKey: "conversation_id",
      as: "conversations",
    });

    // User many-to-many with notifications through user_notification
    User.belongsToMany(db.Notification, {
      through: "UserNotification",
      foreignKey: "user_id",
      otherKey: "notification_id",
      as: "notifications",
    });

    // Self-referencing many-to-many for follows
    User.belongsToMany(db.User, {
      through: "follows",
      foreignKey: "following_id",
      otherKey: "followed_id",
      as: "followers",
    });

    User.belongsToMany(db.User, {
      through: "follows",
      foreignKey: "followed_id",
      otherKey: "following_id",
      as: "following",
    });
  };

  return User;
};
