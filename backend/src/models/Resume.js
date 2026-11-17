const mongoose = require("mongoose")

const resumeSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    originalName: {type: String, required: true},
    filename: {type: String, required: true},
    filePath: {type: String, required: true},
    mimeType: {type: String, required: true},
    size: {type: Number, required:true,min:0},

    },
    {timestamps:true}
)

const Resume = mongoose.model("Resume",resumeSchema)

module.exports = Resume