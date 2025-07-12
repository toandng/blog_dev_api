require("module-alias/register");
require("dotenv").config();
const { createToken } = require("@/utils/jwt");
const transporter = require("@/config/mailer");
const loadEmail = require("@/utils/loadEmail");
const { User } = require("@/db/models");

async function sendVerifyEmailJob(job) {
  const { dataValues: payload } = job;

  const { email } = JSON.parse(payload.payload);
  console.log(email);

  try {
    const user = await User.findOne({ where: { email } });
    ``;
    const token = createToken(
      { userId: user.id },
      {
        expiresIn: 60 * 60 * 12,
      }
    );
    // Tạo link xác minh email

    const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
    console.log(verifyUrl, "hello");

    const data = { token, email, verifyUrl };
    const template = await loadEmail("verify-email", data);
    console.log(template);

    await transporter.sendMail({
      from: "meocute0508@gmail.com",
      to: user.email,
      html: template,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
module.exports = sendVerifyEmailJob;
