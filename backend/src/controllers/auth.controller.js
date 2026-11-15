const User = require("../models/User.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async (req,res)=>{

    
    const {name, email, password} = req.body

    try{
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message:"Missing required fields"
            })
        }

        // checking user exists
        const user = await User.findOne({email})
        if(user){
            return res.status(409).json({
                success: false,
                message: "Email already in use"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user:{
                id:newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })
    }catch(error){
        console.error("Registration error: ",error.message)

        if(error.code===11000){
            return res.status(409).json({
                success: false,
                message: "Email already in use"
            })
        }
        return res.status(500).json({
            success: false,
            message:"Internal Server Error"
        })
    }


}

const loginUser = async(req,res)=>{


    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message:"Required fields are missing"
            })
        }
        
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success: false,
                message:"Invalid email or password"
            })
        }

        const compare = await bcrypt.compare(password,user.password)

        if(!compare){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const token = generateToken(user._id)

        return res
                .cookie("token",token,{
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    maxAge: 2*60*60*1000
                })
        .status(200).json({
            success: true,
            message: "User logged in successfully"
        })
    } catch(error){
        console.error("Error occurred ",error.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const logoutUser = (req,res)=>{
        res.status(200).json({
        success: true,
        message: "User logged out"
    })
}

const getCurrentUser = (req,res) =>{
        res.status(200).json({
        success: true,
        message: "Hello user"
    })
}

const generateToken = (userId) =>{
    return jwt.sign(
        {id:userId},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN || "2h"}
    );
};

module.exports =  {registerUser, loginUser, logoutUser, getCurrentUser}