module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      name: {
        type: DataTypes.STRING(50),
        unique: true,
      },
    },
    {
      tableName: "tags",
      underscored: true,
      timestamps: true,
    }
  );

  Tag.associate = (db) => {
    // Tag many-to-many with posts through tag_post
    Tag.belongsToMany(db.Post, {
      through: "TagPost",
      foreignKey: "tag_id",
      otherKey: "post_id",
      as: "posts",
    });
  };

  return Tag;
};
