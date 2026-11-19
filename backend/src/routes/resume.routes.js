const express  = require("express")
const router = express.Router()
const protect= require("../middleware/auth.middleware")
const upload = require("../middleware/upload.middleware")
const authorizeResumeOwner = require("../middleware/authorizeResume.middleware")

const{ uploadResume, getAllResumes,getResume, deleteResume} = require("../controllers/resume.controller")

router.post("/",protect,upload.single("resume"),uploadResume);

router.get("/",protect,getAllResumes);

router.get("/:id",protect,authorizeResumeOwner,getResume);

router.delete("/:id",protect,authorizeResumeOwner,deleteResume);

module.exports = router