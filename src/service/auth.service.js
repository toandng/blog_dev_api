const { where } = require("sequelize");
const { User, Queue } = require("@/db/models");
const { hash, compare } = require("@/utils/bcrypt");
const jwtService = require("@/service/jwt.service");
const refreshTokenService = require("@/service/refreshToken.service");

const register = async (data) => {
  const user = await User.create({
    ...data,
    password: await hash(data.password),
    first_name: data.first_name,
    last_name: data.last_name,
  });
  console.log(user);

  const userId = user.id;
  const token = jwtService.generateAccessToken(userId);
  return {
    userId,
    token,
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email }, raw: true });
  if (!user) {
    throw new Error("Thông tin đăng nhập không hợp lệ");
  }

  const isValid = await compare(password, user.password);
  if (!isValid) {
    throw new Error("Thông tin đăng nhập không hợp lệ");
  }

  const tokenData = jwtService.generateAccessToken(user.id);
  const refreshToken = await refreshTokenService.createRefreshToken(user.id);
  return {
    ...tokenData,
    refresh_token: refreshToken.token,
  };
};

const forGotPassWord = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Không tìm thấy người dùng với email này");
  }

  await User.update({ verified_at: null }, { where: { id: user.id } });
  await Queue.create({
    type: "sendVerifyEmailJob",
    payload: { userId: user.id },
  });
};

const resetPassword = async (data) => {
  const { token, password, confirmPassword, ...remaining } = data;

  console.log("Reset password data:", data);

  if (!token) {
    throw new Error("Token không được để trống");
  }

  if (!password) {
    throw new Error("Mật khẩu không được để trống");
  }

  if (password !== confirmPassword) {
    throw new Error("Mật khẩu xác nhận không khớp");
  }

  try {
    // Extract userId từ token
    const { userId } = jwtService.verifyAccessToken(
      token,
      process.env.MAIL_JWT_SECRET
    );

    console.log("Extracted userId:", userId);

    if (!userId) {
      throw new Error("Token không hợp lệ hoặc đã hết hạn");
    }

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    const isValid = await compare(password, user.password);
    if (isValid) {
      throw new Error("Mật khẩu mới phải khác mật khẩu cũ");
    }

    await User.update(
      {
        password: await hash(password),
        verified_at: new Date(),
      },
      {
        where: {
          id: userId,
        },
      }
    );

    console.log(`Password updated successfully for user ${userId}`);
  } catch (error) {
    console.error("Reset password error:", error);
    if (error.message.includes("jwt")) {
      throw new Error("Token không hợp lệ hoặc đã hết hạn");
    }

    throw new Error(error.message || "Có lỗi xảy ra khi đặt lại mật khẩu");
  }
};

const verifyEmail = async (token) => {
  try {
    const { userId } = jwtService.verifyAccessToken(
      token,
      process.env.MAIL_JWT_SECRET
    );
    const { dataValues: user } = await User.findOne({ where: { id: userId } });
    if (user.verified_at) {
      return "verified";
    }
    await User.update(
      {
        verified_at: Date.now(),
      },
      {
        where: { id: userId },
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

const verifyToken = async (token) => {
  try {
    return jwtService.verifyAccessToken(token, process.env.MAIL_JWT_SECRET);
  } catch (error) {
    throw new Error(error);
  }
};
const refreshAccessToken = async (refreshTokenString) => {
  const refreshToken = await refreshTokenService.findValidRefreshToken(
    refreshTokenString
  );
  if (!refreshToken) {
    throw new Error("Refresh token không hợp lệ");
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
  resetPassword,
  verifyEmail,
  verifyToken,
  refreshAccessToken,
};
