import { createTransport } from "nodemailer";
import envUtils from "./env.utils.js";

async function sendEmail(data) {
  const verificationUrl = `${envUtils.VERIFICATION_ENDPOINT}`;
  try {
    const transport = createTransport({
      service: "gmail",
      port: envUtils.PORT,
      auth: { user: envUtils.GOOGLE_EMAIL, pass: envUtils.GOOGLE_PASSWORD },
    });
    await transport.sendMail({
      from: `Comunidad YANBAL <${envUtils.GOOGLE_EMAIL}>`,
      to: data.email,
      subject: `${data.name.toUpperCase()} ¡Has sido registrado correctamente!`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: #ffffff; border-radius: 10px; padding: 20px;">
            <h1 style="color: #333333; text-align: center;">¡Bienvenido, ${data.name}!</h1>
            <p style="color: #555555; text-align: center;">Te informamos que has sido registrado exitosamente.</p>
            <p style="color: #555555; text-align: center;">Por favor, verifica tu cuenta utilizando el siguiente código:</p>
            <div style="background-color: #f0f0f0; border-radius: 5px; padding: 10px; text-align: center;">
              <strong style="color: #333333; font-size: 18px;">Código de Verificación:</strong>
              <p style="color: #333333; font-size: 24px; margin: 10px 0;">${data.verifiedCode}</p>
            </div>
            <p style="color: #555555; text-align: center; margin-top: 20px;">
          Haz clic <a href="${verificationUrl}" style="color: #007bff;">aquí</a> para verificar tu cuenta.
        </p>
          </div>
          <p style="color: #777777; text-align: center; margin-top: 20px;">Gracias por unirte a nuestra comunidad.</p>
          <p style="color: #777777; text-align: center;">Equipo de YANBAL</p>
        </div>
      `,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;
