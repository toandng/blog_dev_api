const { Post, Topic, Comment, User } = require("@/db/models");

const getAllUser = async () => {
  const user = await User.findAll();
  return user;
};
const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};
const update = async (id, data) => {
  const user = await User.update(data, { where: { id } });
  return user;
};
module.exports = {
  getAllUser,
  getUserById,
  update,
};
