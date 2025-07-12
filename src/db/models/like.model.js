module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      likeable_type: {
        type: DataTypes.STRING,
      },
      likeable_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "likes",
      underscored: true,
      timestamps: true,
    }
  );

  Like.associate = (db) => {
    // Like belongs to user
    Like.belongsTo(db.User, {
      foreignKey: "user_id",
      as: "user",
    });

    // Polymorphic associations
    Like.belongsTo(db.Post, {
      foreignKey: "likeable_id",
      constraints: false,
      as: "post",
    });

    Like.belongsTo(db.Comment, {
      foreignKey: "likeable_id",
      constraints: false,
      as: "comment",
    });
  };

  return Like;
};
