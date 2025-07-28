const userService = require("@/service/user.service");
const response = require("@/utils/response");
const getUserByUsername = async (req, res) => {
  try {
    const result = await userService.getUserByUsername(
      req.params.username,
      req.user
    );
    response.succsess(res, 200, result);
  } catch (error) {
    console.log(123);

    response.error(res, 400, error.message);
  }
};

const toggleFollow = async (req, res) => {
  try {
    const result = await userService.toggleFollow(req.user, +req.params.userId);
    response.succsess(res, 200, result);
  } catch (error) {
    response.error(res, 400, error.message);
  }
};

const checkFollowing = async (req, res) => {
  try {
    const result = await userService.checkFollowing(
      req.user,
      +req.params.userId
    );
    response.succsess(res, 200, result);
  } catch (error) {
    response.error(res, 400, error.message);
  }
};

module.exports = {
  getUserByUsername,
  toggleFollow,
  checkFollowing,
};
