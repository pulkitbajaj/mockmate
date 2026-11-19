const Resume = require("../models/Resume")
const fs = require("fs/promises")

const uploadResume = async(req,res) =>{
    
    const file = req.file
    if(!file){
        return res.status(400).json({
            success: false,
            message:"Please upload a resume"
        })
    }
    try{
        
        const resume =  await Resume.create({
            user: req.user._id,
            originalName: file.originalname,
            filename: file.filename,
            filePath: file.path,
            mimeType: file.mimetype,
            size:file.size
        })

        return res.status(201).json({
            success: true,
            message: "Resume uploaded successfully",
            resume: {
                id: resume._id,
                originalName: resume.originalname,
                filename: resume.filename,
                mimeType: resume.mimeType,
                size: resume.size,
                createdAt: resume.createdAt
            }
        });

    }catch(error){
        console.error("Error uploading resume ",error.message)

        try{
            await fs.unlink(file.path)
        } catch(cleanupError){
            console.error("File cleanup failed: ",cleanupError.message)
        }

        return res.status(500).json({
            success:false,
            message:"Failed to upload resume"
        })
    }
}

const getAllResumes = (req,res)=>{
    res.status(200).json({
        success: true,
        message: "All resumes displayed"
    })
}

const getResume = (req,res) =>{
    const {_id, originalName, mimeType, size, createdAt, updatedAt} = req.resume;

    res.status(200).json({
        success:true,
        message: `Here is your resume`,
        resume: {
            id: _id,
            originalName,
            mimeType,
            size,
            createdAt,
            updatedAt
        }
    })
}

const deleteResume = (req,res) =>{
    res.status(200).json({
        success: true,
        message:`Resume with ID ${req.params.id} deleted successfully`
    })
}

module.exports = {uploadResume,getAllResumes,getResume,deleteResume}