module.exports = (sequelize, DataTypes) => {
  const UserSetting = sequelize.define(
    "UserSetting",
    {
      user_id: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      data: {
        type: DataTypes.JSON,
      },
    },
    {
      tableName: "user_setting",
      underscored: true,
      timestamps: true,
    }
  );

  UserSetting.associate = (db) => {
    // UserSetting belongs to user
    UserSetting.belongsTo(db.User, {
      foreignKey: "user_id",
      // as: "user",
    });
  };

  return UserSetting;
};
