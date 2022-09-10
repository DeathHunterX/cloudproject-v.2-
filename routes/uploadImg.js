require('dotenv').config()

const router = require('express').Router()
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const auth = require('../middleware/auth')


//Cloudinary API
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// Upload image
router.post('/upload', auth, (req, res) => {
    try{
        // console.log(req.files)
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No files were uploaded.'})
        
        const file = req.files.file;
        if(file.size > 1024 * 1024 * 5) { // File: 5MB
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Size too large"})
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "File format is incorrect."})
        }

        cloudinary.uploader.upload(file.tempFilePath, {folder: "Looking For Helpers/avatar"}, async(err, result)=>{
            if(err) throw err;
            removeTmp(file.tempFilePath)

            res.json({public_id: result.public_id, url: result.secure_url})
        })
    }
    catch (err){
        return res.status(500).json({msg: err.message})
    }
})

// Delete  image
router.post('/deleteImg', auth, (req, res)  => {
    try{
        const {public_id} = req.body
        if(!public_id) return res.status(500).json({msg: "No images selected!"})

        cloudinary.uploader.destroy(public_id, async(err, result) => {
            if(err) throw err

            res.json({msg: "Delete image"})
        })
    }
    catch (err){
        return res.status(500).json({msg: err.message})
    }
})

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}
module.exports = router