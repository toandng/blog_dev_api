module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      type: {
        type: DataTypes.STRING(50),
      },
      title: {
        type: DataTypes.STRING(255),
      },
      notifiable_type: {
        type: DataTypes.STRING(100),
      },
      notifiable_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "notifications",
      underscored: true,
      timestamps: true,
    }
  );

  Notification.associate = (db) => {
    // Notification many-to-many with users through user_notification
    Notification.belongsToMany(db.User, {
      through: "UserNotification",
      foreignKey: "notification_id",
      otherKey: "user_id",
      as: "users",
    });
  };

  return Notification;
};
