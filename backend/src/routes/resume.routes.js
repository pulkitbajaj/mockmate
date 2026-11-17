const express  = require("express")
const router = express.Router()
const protect= require("../middleware/auth.middleware")
const upload = require("../middleware/upload.middleware")

const{ uploadResume, getAllResumes,getResume, deleteResume} = require("../controllers/resume.controller")

router.post("/",protect,upload.single("resume"),uploadResume);

router.get("/",getAllResumes);

router.get("/:id",getResume);

router.delete("/:id",deleteResume);

module.exports = router