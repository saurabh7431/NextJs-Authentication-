import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/usersModel';
import { Button } from '@/components/ui/button';

export const sendEmail = async ({email, emailType, userId, req}) => {
   try {
    
    //TODO: Configure nodemailer for usage
     const hashedtoken= await bcryptjs.hash(userId.toString(),10);

    if (emailType === "VERIFY") {
          await User.findByIdAndUpdate(userId, {verifyToken:hashedtoken, verifyTokenExpire: Date.now() + 3600000});
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {forgotPasswordToken:hashedtoken, forgotPasswordExpire: Date.now() + 3600000});
    }


    // Looking to send emails in production? Check out our Email API/SMTP product!
     var transport = nodemailer.createTransport({
       host: "smtp.gmail.com",
       secure: true,  // true for 465, false for other ports
       port: 465,
       auth: {
         user: "sanu17273@gmail.com",
         pass: "cfhp qafr bclo ypdf"
       }
     });
     const fullUrl = new URL(req.url, `http://${req.headers.host}`);
     const baseUrl = `${fullUrl.protocol}//${fullUrl.host}`;
     
     //TODO: Add email verification/reset password link in email template
     const mailOptions = {
      from: 'sanu17273@gmail.com', 
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", 
      html: `
      <html>
          <head>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                      margin: 0;
                      padding: 0;
                  }
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                      background-color: #ffffff;
                      border-radius: 8px;
                      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                  }
                  .header {
                      text-align: center;
                      padding: 20px 0;
                  }
                  h1 {
                      color: #333;
                  }
                  p {
                      font-size: 16px;
                      color: #555;
                  }
                  .button {
                      display: inline-block;
                      background-color: #007bff;
                      color: white;
                      padding: 10px 20px;
                      text-decoration: none;
                      border-radius: 5px;
                      font-size: 16px;
                      font-weight: bold;
                      margin-top: 20px;
                      text-align: center;
                      transition: background-color 0.3s ease;
                  }
                  .button:hover {
                      background-color: #0056b3;
                  }
                  .footer {
                      text-align: center;
                      font-size: 12px;
                      color: #aaa;
                      margin-top: 30px;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <h1>${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}</h1>
                  </div>
                  <p>Dear user,</p>
                  <p>We have received a request to ${emailType === "VERIFY" ? "verify your email address" : "reset your password"}. Please click the button below to complete the process:</p>
                  <p>
                      <a href="${baseUrl}/verifyemail?token=${hashedtoken}" class="button">Click Here to ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}</a>
                  </p>
                  <p>Alternatively, you can copy and paste the following link into your browser:</p>
                  <p><a href="${baseUrl}/verifyemail?token=${hashedtoken}">${baseUrl}/verifyemail?token=${hashedtoken}</a></p>
                  <div class="footer">
                      <p>If you did not request this, please ignore this email.</p>
                      <p>Thanks, The Team</p>
                  </div>
              </div>
          </body>
      </html>
      `
  };
  
      const mailResponse= await transport.sendMail(mailOptions);
      return mailResponse;

   } catch (error) {
     throw new Error(error.message);
   }
      
}