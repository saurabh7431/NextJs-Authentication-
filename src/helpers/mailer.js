import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/usersModel';

export const sendEmail = async ({email, emailType, userId}) => {
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
       host: "sandbox.smtp.mailtrap.io",
       port: 2525,
       auth: {
         user: "2b13275b71dc0a",
         pass: "d0ecd17c351cc9"
       }
     });

      const mailOptions={
            from: 'saurabh70@gmail.com', 
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", 
            html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedtoken}">here </a> to 
            ${emailType === "VERIFY" ? "verify your email" : "verify your password"}
            or copy and paste the link below in your browser 
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedtoken}
            </p>`
          
      }

      const mailResponse= await transport.sendMail(mailOptions);
      return mailResponse;

   } catch (error) {
     throw new Error(error.message);
   }
      
}