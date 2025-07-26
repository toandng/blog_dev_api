require("module-alias/register");
require("dotenv").config();
const transporter = require("@/config/mailer");
const loadEmail = require("@/utils/loadEmail");
const { User } = require("@/db/models");
const jwtService = require("@/service/jwt.service");

async function sendVerifyEmailJob(job) {
  try {
    const { userId } = JSON.parse(job.payload);

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error(`User not found with ID: ${userId}`);
    }

    const { access_token } = jwtService.generateAccessToken(
      userId,
      process.env.MAIL_JWT_SECRET
    );

    // Tạo link xác minh email
    const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${access_token}`;

    const data = { access_token, userId, verifyUrl };
    const template = await loadEmail("verify-email", data);

    if (!template) {
      throw new Error("Failed to load email template");
    }

    console.log("Email template loaded successfully");

    // Gửi email
    const result = await transporter.sendMail({
      from: process.env.MAIL_FROM || "meocute0508@gmail.com",
      subject: "Verification email",
      to: user.email,
      html: template,
    });

    console.log(`Email sent successfully to ${user.email}:`, result.messageId);
    return result;
  } catch (error) {
    console.error("Error in sendVerifyEmailJob:", error.message);
    console.error(error.stack);
    throw error; // Re-throw để queue worker có thể handle
  }
}

module.exports = sendVerifyEmailJob;
