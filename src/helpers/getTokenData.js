import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

connect(); 
export async function getTokenData(request) {
    try {
        const token  = request.cookies.get("token")?.value || "";

       const decodedToken= jwt.verify(token, process.env.JWT_SECRET);

       return decodedToken.id;
        
    } catch (error) {
        console.error("Error during token verification:", error);
        
        // Return a response in case of error
        return { message: "Internal Server Error", error: error.message };
        
    }

}
