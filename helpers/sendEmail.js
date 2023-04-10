import "dotenv/config";
import sgMail from "@sendgrid/mail";

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async (msg) => {
  try {
    const email = { ...msg, from: "howter99@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};
