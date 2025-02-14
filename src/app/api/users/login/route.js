import User from "@/models/usersModel";
import { NextResponse } from "next/server";
const { connect } = require("@/dbConfig/dbConfig");
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



connect();

export async function POST(request) {
    try {
        // Parse the JSON request body into an object using the `await request.json()` method
        const reqBody = await request.json();
        // Extract email and password from the request body using destructuring assignment
        const { email, password } = reqBody;

        // Check if email and password are provided in the request body
        if (!email ||!password) {
            return NextResponse.json({ message: "Missing email or password" }, { status: 404 });
        }
        // Check if user exists in the database with the provided email
        const user = await User.findOne({ email });
        // If user not found, return a not found error
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        // Check if user is verified before allowing login
        if(!user.isVerified){
            return NextResponse.json({ message: "User is not verified. Please verify your email before logging in." }, { status: 400 });  // user not verified
        }
        // Compare the provided password with the hashed password in the database
        const validPassword =  await bcryptjs.compare(password, user.password);

        // if password does not match requested passward and compare fails, return an error message
        if (!validPassword) {
            return NextResponse.json({ message: "Invalid password" }, { status: 400 });
        }

        // If password matches, generate a JSON Web Token (JWT) with user data and set it as a cookie
        const tokenData={
            id: user._id,
            email: user.email,
            username: user.username,
        }
        
        // Sign the JWT with the secret key and set the expiration time to 1 day (24 hours)
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });
        const response = NextResponse.json({ message: "User logged in successfully", 
            success: true, }, { status: 200 });

             // Set the JWT as a cookie in the response header with an expiration time of 1 day (24 hours)
        response.cookies.set("token", token, {httpOnly: true})
            // Return the response with the JWT cookie
        return response;    
    
        
    } catch (error) {
        console.error("Error during user login:", error);
        
        // Return a response in case of error
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
        
    }
}