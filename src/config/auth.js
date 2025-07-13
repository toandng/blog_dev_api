module.exports = {
  JWT_SECRET:
    process.env.JWT_SECRET ||
    "8a2424f2384dee190d2f7ecac7e4b60d3735dcef00de169a319d9f70dcbcbd67",
  JWT_EXPIRES_IN: parseInt(process.env.JWT_EXPIRES_IN) || 30, // seconds
  REFRESH_TOKEN_EXPIRES_IN:
    parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN) || 30 * 24 * 60 * 60, // 30 days = 2,592,000 seconds
  TOKEN_TYPE: process.env.TOKEN_TYPE || "Bearer",
};
