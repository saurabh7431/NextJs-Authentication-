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

// import jwt from "jsonwebtoken";

// export async function getTokenData(request) {
//     try {
//         // Extract the token from the request cookies
//         const token = request.cookies.get("token")?.value || "";

//         if (!token) {
//             throw new Error("Token not found");
//         }

//         // Decode the token using JWT
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
//         // Return the decoded user ID
//         return decodedToken.id;
        
//     } catch (error) {
//         console.error("Error during token verification:", error);

//         // Return a detailed response in case of an error
//         throw new Error("Token verification failed: " + error.message);
//     }
// }
