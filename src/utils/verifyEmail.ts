// ./src/utils/email.js
const emailjs = require("@emailjs/browser");

const sendVerificationEmail = async (user) => {
  // Construct the verification link (adjust as needed)
  const verificationLink = `http://localhost:1337/verify/${user.verificationToken}`;

  // Set up the parameters for your EmailJS template
  const templateParams = {
    user_name: user.username,
    user_email: user.email,
    verification_link: verificationLink,
  };

  try {
    const response = await emailjs.send(
      process.env.YOUR_SERVICE_ID,
      process.env.YOUR_TEMPLATE_ID,
      templateParams,
      process.env.YOUR_PUBLIC_KEY
    );
    console.log("Verification email sent successfully!", response);
    return response;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

module.exports = { sendVerificationEmail };
