const response = require("@/utils/response");
const authService = require("@/service/auth.service");
const { Queue } = require("@/db/models");
const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const { tokenData } = await authService.register({
      email,
      password,
      firstName,
      lastName,
    });
    console.log(tokenData);

    await Queue.create({
      type: "sendVerifyEmailJob",
      payload: { email },
    });
    console.log(email);

    response.succsess(res, 200, tokenData);
  } catch (error) {
    response.error(res, 400, error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await authService.login({ email, password });
    return response.succsess(res, 200, userData);
  } catch (error) {
    response.error(res, 401, error.message);
  }
};

const forGotPassWord = async (req, res) => {
  const { email } = req.body;

  try {
    const userData = await authService.forGotPassWord({ email });
    await Queue.create({
      type: "sendVerifyEmailJob",
      payload: { email },
    });
    return response.succsess(res, 200, userData);
  } catch (error) {
    response.error(res, 401, error.message);
  }
};

const refreshToken = async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    return response(res, 400, "Refresh token là bắt buộc");
  }
  try {
    const tokenData = await authService.refreshAccessToken(
      req.body.refresh_token
    );
    response.succsess(res, 200, tokenData);
  } catch (error) {
    response.error(res, 403, error.message);
  }
};

module.exports = {
  register,
  login,
  forGotPassWord,
  refreshToken,
};
