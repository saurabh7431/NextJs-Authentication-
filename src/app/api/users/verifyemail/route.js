import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usersModel";
import { NextResponse } from "next/server";


connect()
export async function POST(request) {
    try {
        const reqBody= await request.json();
        const { token } = reqBody;
        console.log(reqBody);

        const user= await User.findOne({verifyToken:token, verifyTokenExpire:{$gt:Date.now()}});

        if (!user) {
            return NextResponse.json({message: "Invalid or expired token"}, {status: 400});
        }
        console.log(user);

        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpire=undefined;

        user.save();
        return NextResponse.json({message: "Email verified successfully", success:true}, {status: 200});
        
    
    }catch (error) {  
        console.error("Error during email verification:", error);
        
        // Return a response in case of error
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
      }}