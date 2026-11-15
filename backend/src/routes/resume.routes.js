const express  = require("express")
const router = express.Router()

const{ uploadResume, getAllResumes,getResume, deleteResume} = require("../controllers/resume.controller")

router.post("/",uploadResume);

router.get("/",getAllResumes);

router.get("/:id",getResume);

router.delete("/:id",deleteResume);

module.exports = router