import { NextResponse } from "next/server";

const { connect } = require("@/dbConfig/dbConfig");


connect();

export async function GET(request) {
    try {
    
        const response=  NextResponse.json({ message: "User logged out successfully", success: true }, { status: 200 });

        response.cookies.set("token", "", {expires: new Date(0)});
        return response;

    } catch (error) {
        console.error("Error during user logout:", error);
        
        // Return a response in case of error
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
        
    }
}