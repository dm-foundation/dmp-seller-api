import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config({ path: '/.env' });

export const transport = {
    from: process.env.SMTP_EMAIL,
    host: process.env.SMTP_HOST,
    port: 587,
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  }

export const transporter = nodemailer.createTransport({
    ...transport,
});

export const sendEmail = async (
  to: string,
  storeName: string,
  html: string,
) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to,
    subject: `Your receipt from ${storeName} - Mass Market`,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
