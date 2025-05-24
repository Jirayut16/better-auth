import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const response = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: to.toLowerCase().trim(),
      subject: subject.trim(),
      html: html.trim(),
    });
    return {
      success: true,
      messageId: response.data,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email.",
    };
  }
};
