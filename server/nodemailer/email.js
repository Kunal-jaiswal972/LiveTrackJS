import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { transporter, sender } from "./nodemailer.config.js";

export const sendVerificationEmail = (email, verificationToken) => {
  transporter
    .sendMail({
      from: sender,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    })
    .then((info) => {
      console.log("Verification email sent successfully", info);
    })
    .catch((error) => {
      console.error("Error sending verification", error);
      throw new Error(`Error sending verification email: ${error}`);
    });
};

export const sendWelcomeEmail = (email, name) => {
  transporter
    .sendMail({
      from: sender,
      to: email,
      subject: "Welcome to Auth Company",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
    })
    .then((info) => {
      console.log("Welcome email sent successfully", info);
    })
    .catch((error) => {
      console.error("Error sending welcome email", error);
      throw new Error(`Error sending welcome email: ${error}`);
    });
};

export const sendPasswordResetEmail = (email, resetURL) => {
  transporter
    .sendMail({
      from: sender,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    })
    .then((info) => {
      console.log("Password reset email sent successfully", info);
    })
    .catch((error) => {
      console.error("Error sending password reset email", error);
      throw new Error(`Error sending password reset email: ${error}`);
    });
};

export const sendResetSuccessEmail = (email) => {
  transporter
    .sendMail({
      from: sender,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    })
    .then((info) => {
      console.log("Password reset success email sent successfully", info);
    })
    .catch((error) => {
      console.error("Error sending password reset success email", error);
      throw new Error(`Error sending password reset success email: ${error}`);
    });
};
