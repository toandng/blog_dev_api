module.exports = {
  JWT_SECRECT:
    process.env.JWT_SECRECT ||
    "ff966606fd4ab5e174e24b72336a92c09e66d1ace44d0b48867a71e2cbad3660",
  JWT_EXPIRES_IN: parseInt(process.env.JWT_EXPIRES_IN) || 30,
  REFRESH_TOKEN_EXPIRES_IN:
    parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN) || 30 * 24 * 60 * 60,
  TOKEN_TYPE: process.env.TOKEN_TYPE || "Bearer",
};
