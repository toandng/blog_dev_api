const userService = require("@/service/user.service");
const response = require("@/utils/response");
const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;

    if (!username) {
      return response.error(res, 400, "Username parameter is required");
    }

    const result = await userService.getUserByUsername(username);
    response.succsess(res, 200, result);
  } catch (error) {
    console.error("getUserByUsername error:", error);
    response.error(res, 404, error.message);
  }
};

module.exports = {
  getUserByUsername,
};
module.exports = {
  getUserByUsername,
};
