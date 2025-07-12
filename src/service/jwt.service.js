const jwt = require("jsonwebtoken");
const { JWT_SECRECT, JWT_EXPIRES_IN, TOKEN_TYPE } = require("@/config/auth");

const generateAccessToken = (userId) => {
  const token = jwt.sign(
    { userId },
    "ff966606fd4ab5e174e24b72336a92c09e66d1ace44d0b48867a71e2cbad3660",
    {
      expiresIn: 30 * 24 * 60 * 60,
    }
  );

  return {
    access_token: token,
    token_type: TOKEN_TYPE,
    expires_in: JWT_EXPIRES_IN,
  };
};

module.exports = {
  generateAccessToken,
};
