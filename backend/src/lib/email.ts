import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendAccessRequestEmail = async (data: {
  name: string;
  email: string;
  company: string;
  message: string;
}) => {
  const { name, email, company, message } = data;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "🔐 New Access Request - Sol-X",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #1E293B;
              background-color: #F8FAFC;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #FFFFFF;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #0F172A;
              color: #FAFAFA;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
            }
            .content {
              padding: 30px;
            }
            .field {
              margin-bottom: 20px;
            }
            .field-label {
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              color: #64748B;
              margin-bottom: 5px;
            }
            .field-value {
              font-size: 16px;
              color: #1E293B;
              padding: 10px;
              background-color: #F1F5F9;
              border-radius: 4px;
            }
            .message-box {
              background-color: #FEF3C7;
              border-left: 4px solid #F59E0B;
              padding: 15px;
              margin-top: 20px;
            }
            .footer {
              background-color: #F8FAFC;
              padding: 20px;
              text-align: center;
              font-size: 14px;
              color: #64748B;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 New Access Request</h1>
            </div>
            <div class="content">
              <p>A new user has requested access to Sol-X:</p>
              
              <div class="field">
                <div class="field-label">Name</div>
                <div class="field-value">${name}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value">${email}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Company</div>
                <div class="field-value">${company}</div>
              </div>
              
              <div class="message-box">
                <div class="field-label">Message</div>
                <div style="margin-top: 8px;">${message}</div>
              </div>
              
              <p style="margin-top: 30px; color: #64748B; font-size: 14px;">
                To grant access, manually create this user in the database with the appropriate role.
              </p>
            </div>
            <div class="footer">
              <p>Sol-X Access Management System</p>
              <p>© ${new Date().getFullYear()} Sol-X. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Access request email sent successfully");
  } catch (error) {
    console.error("❌ Error sending access request email:", error);
    throw error;
  }
};
