import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usersModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request) {
    try {
        const reqBody= await request.json();
        const { name, username, email, password } = reqBody;

        const user= await User.findOne({email});
        if (user) {
            return NextResponse.json({message: "User already exists"}, {status: 400});
        }
        const salt= await bcryptjs.genSalt(10);
        const hasehdPassword= await bcryptjs.hash(password, salt);

        const newUser= new User({
            name,
            username,
            email,
            password: hasehdPassword,
        });
         const savedUser =await newUser.save();

         // Send verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});
        return NextResponse.json({message: "User created successfully", success:true, savedUser}, {status: 201});
         
        
    } catch (error) {
        console.error("Error during user signup:", error);
        
        // Return a response in case of error
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });

    }

}