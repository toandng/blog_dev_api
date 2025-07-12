const jwt = require("jsonwebtoken");
const { success } = require("./response");

const MAIL_JWT_SECRET =
  "d83626f76dfee41156021ad6531813107715bf36676d56cf1cca81f713b0ed6a";

exports.createToken = function (payload, options) {
  const token = jwt.sign(payload, MAIL_JWT_SECRET, options);

  return token;
};

exports.verifyToken = function (token) {
  try {
    const decoded = jwt.verify(token, MAIL_JWT_SECRET);
    return { success: true, data: decoded };
  } catch (error) {
    return {
      success: false,
      message: message,
    };
  }
};
