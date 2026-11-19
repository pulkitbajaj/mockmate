const mongoose = require("mongoose")
const Resume = require("../models/Resume")

const authorization = async (req,res,next)=>{
    
    try{

        const id = req.params.id
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid resume ID"
            })
        }
        const resume = await Resume.findById(id)

        if(!resume){
            return res.status(404).json({
                success:false,
                messsage: "Resume not found"
            })
        }

        const isOwner = await resume.user.equals(req.user._id)

        if(!isOwner){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this resume"
            })
        }

        req.resume = resume
        next()
    }catch(error){
        console.error("Error occurred Fetching data ",error.message)

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }


}

module.exports = authorization