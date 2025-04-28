import nodemailer from "nodemailer";

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const devFrom = "dev@example.com";
  try {
    const info = await transporter.sendMail({
      from: devFrom,
      to: to.toLowerCase().trim(),
      subject: subject.trim(),
      html: html.trim(),
    });
    console.log("Email sent (dev mode):", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info) || "");
    console.log("info", info);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email.",
    };
  }
};
