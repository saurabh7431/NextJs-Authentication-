import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    username:{
        type:String,
        required:[true, "Username is required"],
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:[true, "Email is already taken"],
    },
    password:{
        type:String,
        required:[true, "Password is required"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:String,
    forgotPasswordExpire:Date,
    

    verifyToken:String,
    verifyTokenExpire:Date,
})

 const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;