module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    "Conversation",
    {
      name: {
        type: DataTypes.STRING(50),
      },
      avatar: {
        type: DataTypes.STRING(255),
      },
      last_message_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "conversations",
      underscored: true,
      timestamps: true,
    }
  );

  Conversation.associate = (db) => {
    // Conversation has many messages
    Conversation.hasMany(db.Message, {
      foreignKey: "conversation_id",
      as: "messages",
    });

    // Conversation many-to-many with users through user_conversation
    Conversation.belongsToMany(db.User, {
      through: "UserConversation",
      foreignKey: "conversation_id",
      otherKey: "user_id",
      as: "users",
    });
  };

  return Conversation;
};
