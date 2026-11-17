const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const upload = require("./middleware/upload.middleware")

const app = express();

const authRoutes = require("./routes/auth.routes")
const resumeRoutes = require("./routes/resume.routes")

app.use(express.json())


app.use(cors(
    {
        origin:process.env.CLIENT_URL||"http://localhost:3000",
        credentials: true,
    }
))

app.use(cookieParser())

app.use("/api/v1/auth",authRoutes)  
app.use("/api/v1/resumes",resumeRoutes)

// Basic Route
app.get("/",(req,res)=>{    
    res.status(200).json({
        success: true,
        message: "Welcome to MockMate API",
    });
});

// Health Check
app.get("/api/v1/health",(req,res)=>{
    res.status(200).json({
        success: true,
        message: "MockMate backend is running",
        timestamp: new Date().toISOString(),
    });
});

app.post("/upload",upload.single("resume"),(req,res)=>{
     console.log(req.file)
     return res.status(200).json({
        success: true,
        message: "File uploaded"
     })
})

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`,
    });
});

module.exports = app