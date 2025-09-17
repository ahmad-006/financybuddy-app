const generateOtpEmailHtml = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td style="padding-bottom: 20px; text-align: center; border-bottom: 1px solid #eee;">
                    <h1 style="font-size: 24px; color: #0056b3; margin: 0;">FinancyBuddy</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 30px 0;">
                    <p style="font-size: 16px; margin-bottom: 15px;">Hello,</p>
                    <p style="font-size: 16px; margin-bottom: 15px;">Thank you for registering with FinancyBuddy. To complete your registration, please use the following One-Time Password (OTP):</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <span style="display: inline-block; padding: 15px 25px; background-color: #007bff; color: #ffffff; font-size: 28px; font-weight: bold; border-radius: 5px; text-decoration: none;">
                            ${otp}
                        </span>
                    </div>
                    <p style="font-size: 16px; margin-bottom: 15px;">This OTP is valid for 5 minutes. Please do not share this code with anyone.</p>
                    <p style="font-size: 16px; margin-bottom: 15px;">If you did not request this, please ignore this email.</p>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 20px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #eee;">
                    <p>&copy; ${new Date().getFullYear()} FinancyBuddy. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </div>
    `;
};

const generateResetPasswordEmailHtml = (resetUrl) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td style="padding-bottom: 20px; text-align: center; border-bottom: 1px solid #eee;">
                    <h1 style="font-size: 24px; color: #0056b3; margin: 0;">FinancyBuddy</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 30px 0;">
                    <p style="font-size: 16px; margin-bottom: 15px;">Hello,</p>
                    <p style="font-size: 16px; margin-bottom: 15px;">You have requested to reset your password for your FinancyBuddy account. Please click on the link below to reset your password:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" style="display: inline-block; padding: 15px 25px; background-color: #007bff; color: #ffffff; font-size: 18px; font-weight: bold; border-radius: 5px; text-decoration: none;">
                            Reset Your Password
                        </a>
                    </div>
                    <p style="font-size: 16px; margin-bottom: 15px;">This link is valid for a limited time. If you did not request a password reset, please ignore this email.</p>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 20px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #eee;">
                    <p>&copy; ${new Date().getFullYear()} FinancyBuddy. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </div>
    `;
};

const generateWelcomeEmailHtml = (name) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td style="padding-bottom: 20px; text-align: center; border-bottom: 1px solid #eee;">
                    <h1 style="font-size: 24px; color: #0056b3; margin: 0;">Welcome to FinancyBuddy!</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 30px 0;">
                    <p style="font-size: 16px; margin-bottom: 15px;">Hello ${name},</p>
                    <p style="font-size: 16px; margin-bottom: 15px;">Thank you for joining FinancyBuddy! We're excited to help you manage your finances with ease.</p>
                    <p style="font-size: 16px; margin-bottom: 15px;">Get started by exploring your dashboard and setting up your budgets and transactions.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="http://localhost:5173/dashboard" style="display: inline-block; padding: 15px 25px; background-color: #007bff; color: #ffffff; font-size: 18px; font-weight: bold; border-radius: 5px; text-decoration: none;">
                            Go to Dashboard
                        </a>
                    </div>
                    <p style="font-size: 16px; margin-bottom: 15px;">If you have any questions, feel free to contact our support team.</p>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 20px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #eee;">
                    <p>&copy; ${new Date().getFullYear()} FinancyBuddy. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </div>
    `;
};

module.exports = {
  generateOtpEmailHtml,
  generateResetPasswordEmailHtml,
  generateWelcomeEmailHtml,
};
