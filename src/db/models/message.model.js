module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      conversation_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "conversations",
          key: "id",
        },
      },
      type: {
        type: DataTypes.STRING(50),
        defaultValue: "text",
      },
      content: {
        type: DataTypes.TEXT,
      },
      delete_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "messages",
      underscored: true,
      timestamps: true,
    }
  );

  Message.associate = (db) => {
    // Message belongs to user
    Message.belongsTo(db.User, {
      foreignKey: "user_id",
      as: "user",
    });

    // Message belongs to conversation
    Message.belongsTo(db.Conversation, {
      foreignKey: "conversation_id",
      as: "conversation",
    });
  };

  return Message;
};
