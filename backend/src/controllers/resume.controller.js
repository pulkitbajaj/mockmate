const uploadResume = (req,res) =>{
    res.status(201).json({
        success: true,
        message: "Resume uploaded successfully"
    })
}

const getAllResumes = (req,res)=>{
    res.status(200).json({
        success: true,
        message: "All resumes displayed"
    })
}

const getResume = (req,res) =>{
    res.status(200).json({
        success:true,
        message: `Here is your resume with ${req.params.id}`
    })
}

const deleteResume = (req,res) =>{
    res.status(200).json({
        success: true,
        message:`Resume with ID ${req.params.id} deleted successfully`
    })
}

module.exports = {uploadResume,getAllResumes,getResume,deleteResume}