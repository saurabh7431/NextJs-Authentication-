import User from "@/models/usersModel";
import { NextResponse } from "next/server";
const { connect } = require("@/dbConfig/dbConfig");
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const validPassword =  await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ message: "Invalid password" }, { status: 400 });
        }

        const tokenData={
            id: user._id,
            email: user.email,
            username: user.username,
        }
        

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });
        const response = NextResponse.json({ message: "User logged in successfully", 
            success: true, }, { status: 200 });

        response.cookies.set("token", token, {httpOnly: true})

        return response;    
    
        
    } catch (error) {
        console.error("Error during user login:", error);
        
        // Return a response in case of error
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
        
    }
}