import { createTransport } from "nodemailer";
import envUtils from "./env.utils.js";

async function sendEmail(data) {
  try {
    const transport = createTransport({
      service: "gmail",
      port: envUtils.PORT,
      auth: { user: envUtils.GOOGLE_EMAIL, pass: envUtils.GOOGLE_PASSWORD },
    });
    await transport.sendMail({
      from: `CODER <${envUtils.GOOGLE_EMAIL}>`,
      to: data.email,
      subject: `USER ${data.name.toUpperCase()} REGISTERED`,
      html: `
        <h1>USER REGISTERED!<h1>
        <p>VERIFY CODE: ${data.verifiedCode}</p>
      `,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;
