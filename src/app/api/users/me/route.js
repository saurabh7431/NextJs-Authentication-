import { connect } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/usersModel";
import { NextResponse } from "next/server";


connect();

// export async function POST(request) {

//     const userId= await getTokenData(request);

//     if (!userId) {
//         return NextResponse.json({message: "Unauthorized"}, {status: 401});
//     }

//     const user= await User.findById({_id:userId}).select("-password");

//     if (!user) {
//         return NextResponse.json({message: "User not found"}, {status: 404});
//     }
//     return NextResponse.json({ message:"User Found", data: user}, {status: 200});

// }

// import { connect } from "@/dbConfig/dbConfig";
// import { getTokenData } from "@/helpers/getTokenData";
// import User from "@/models/usersModel";
// import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        
        const userId = await getTokenData(request);  

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

      
        const user = await User.findById(userId).select("-password");

        // If user is not found, return a not found error
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Return the user data if found
        return NextResponse.json({ message: "User Found", data: user }, { status: 200 });

    } catch (error) {
        console.error("Error in POST handler:", error);

        // Return an internal server error if anything goes wrong
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}
