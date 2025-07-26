const { Post, Topic, Comment, User, Sequelize } = require("@/db/models");

const getAllUser = async () => {
  const user = await User.findAll();
  return user;
};
const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

const getUserByUsername = async (username) => {
  if (!username) {
    throw new Error("Username is required");
  }

  const user = await User.findOne({
    where: {
      username,
    },
    attributes: {
      exclude: ["password", "refresh_token"],
    },
  });

  if (!user) {
    throw new Error("User does not exist");
  }

  return user;
};

const update = async (id, data) => {
  const user = await User.update(data, { where: { id } });
  return user;
};
module.exports = {
  getAllUser,
  getUserById,
  getUserByUsername,
  update,
};
