const jwt = require("jsonwebtoken")
const User = require("../models/User")

const protect= async(req,res,next)=>{
    try{

        const token = req.cookies?.token
        if(!token){
            return res.status(401).json({
                success: false,
            message:"Authentication required"
        })
    }
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
    const user = await User.findById(decoded.id).select("-password")
    
    if(!user){
        return res.status(401).json({
            success: false,
            message: "User not found"
        })
    }
    req.user = user
    next();
    }catch(error){
        console.error("Authentication error: ",error.message)

        if(error.name === "JsonWebTokenError" || error.name === "TokenExpiredError" ||
            error.name === "NotBeforeError"
        ){
            return res.status(401).json({
                success:false,
                message:"Invalid or expired token"
            })
        }

        return res.status(500).json({
            success: false,
            message:"Internal Server error"
        })
    }

}

module.exports = protect