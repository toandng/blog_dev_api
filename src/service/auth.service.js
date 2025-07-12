const { User } = require("@/db/models");
const { hash, compare } = require("bcrypt");
const jwtService = require("@/service/jwt.service");
const refreshTokenService = require("@/service/refreshToken.service");

const register = async ({ email, password, firstName, lastName }) => {
  const hashedPassword = await hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    first_name: firstName,
    last_name: lastName,
  });

  const tokenData = jwtService.generateAccessToken(user.id);
  const refreshToken = await refreshTokenService.createRefreshToken(user.id);

  return { ...tokenData, refresh_token: refreshToken.token, userId: user.id };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Thông tin đăng nhập không hợp lệ");
  }

  const isValid = await compare(password, user.password);
  if (!isValid) {
    throw new Error("Thông tin đăng nhập không hợp lệ");
  }

  const tokenData = jwtService.generateAccessToken(user.id);
  console.log(tokenData);

  const refreshToken = await refreshTokenService.createRefreshToken(user.id);

  return {
    ...tokenData,
    refresh_token: refreshToken.token,
  };
};

const forGotPassWord = async ({ email }) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const refreshAccessToken = async (refreshTokenString) => {
  const refreshToken = await refreshTokenService.findValidRefreshToken(
    refreshTokenString
  );
  if (!refreshToken) {
    throw new Error("Refresh không hợp lệ");
  }
  const tokenData = jwtService.generateAccessToken(refreshToken.user_id);
  await refreshTokenService.deleteRefreshToken(refreshToken);

  const newRefreshToken = await refreshTokenService.createRefreshToken(
    refreshToken.user_id
  );
  return {
    ...tokenData,
    refresh_token: newRefreshToken.token,
  };
};

module.exports = {
  register,
  login,
  forGotPassWord,
  refreshAccessToken,
};
