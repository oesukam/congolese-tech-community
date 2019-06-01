import mailer from './mailer';

const { DOMAIN } = process.env.DOMAIN;

const bodyDefault = `
        Thank you for registering at Tech Community,
        your account has been created and must be activated before you can use it 
        To activate your account use the link bellow.
`;
/**
 * Send a link containing a token,
 * returns an object with a sent
 * property
 *
 * @param {string} email
 * @param {string} name
 * @param {string} token
 * @param {string} body
 * @returns {object} {sent,error}
 */
const sendToken = async (email, name, token, body = bodyDefault) => {
  const link = `${DOMAIN}/api/v1/auth/verification/${token}`;

  try {
    const response = await mailer({
      email,
      subject: 'Email verification',
      text: `${name}`,
      link,
      linkText: 'VERIFY MY ACCOUNT',
      name,
      title: 'Welcome to Tech Community',
      body,
    });

    return response;
  } catch (error) {
    return {
      sent: false,
      error,
    };
  }
};

/**
 * Send a link for password reset,
 * returns an object with a sent
 * property
 *
 * @param {string} email
 * @param {string} name
 * @param {string} token
 * @param {string} body
 * @returns {object} {sent,error}
 */
export const resetPasswordMail = async (email, name, token) => {
  const link = `${DOMAIN}/auth/reset-password/${token}`;
  const body = `
      You have requested for a password reset. 
      Tap the button below to reset your account password.
      Ignore the email if you did not request for a new password
    `;
  try {
    const response = await mailer({
      email,
      subject: 'Reset Password',
      text: `${name}`,
      link,
      linkText: 'RESET YOUR PASSWORD',
      name,
      title: 'Reset Password',
      body,
    });

    return response;
  } catch (error) {
    return {
      sent: false,
      error,
    };
  }
};

export default sendToken;
