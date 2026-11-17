const path = require('path')
const multer = require("multer")

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },

    filename:(req,file,cb)=>{
        const unique = Date.now() + '-' + Math.round(Math.random() *1e9);
       const ext = path.extname(file.originalname).toLowerCase();
       const name = path.basename(file.originalname, path.extname(file.originalname));
        cb(null,`${name}-${unique}${ext}`)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === "application/pdf"){
        cb(null,true)
    }else{
        cb(new Error("Only pdf file are allowed"),false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter:fileFilter,
    limits:{fileSize: 5 * 1024 * 1024}
})

module.exports = upload