const path = require('path')
const multer = require('multer')
const router = require('express').Router()

const auth = require('../middleware/auth')

const storage = multer.diskStorage({
    destination: './cvFiles',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
})

function fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
        return cb(
        new Error(
            'Only upload files with pdf, doc, docx format.'
        )
        );
    }
    cb(undefined, true); // continue with upload
      
}

const uploadFiles = multer({
    storage: storage,
    // limits: {
    //     fieldSize: 1000000
    // },
    // fileFilter: fileFilter
})

router.post("/uploadFiles", uploadFiles.single("cvFile"), auth, (req, res) => {
    console.log(req.file)
    res.send("Single File")
    // uploadFiles(req, res, err => {
    //     if (err instanceof multer.MulterError) {
    //         return res.status(400).json({msg: err})
    //     }
    //     return res.json({
    //         image: req.file, 
    //     })
    // })
})

module.exports = router