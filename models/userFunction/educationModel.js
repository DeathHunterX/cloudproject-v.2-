const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref:'user',
        required: true
    },
    country: {
        type: String
    },
    career:{
        type: String,
        required: true
    },
    institutionName: {
        type: String,
        required: true
    },
    startYear: {
        type: Number,
        min: 1930,
        required: true,
    },
    endYear: {
        type: Number,
        // max: (new Date(Date.now).getFullYear()) + 1,
        default:'',
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('educationInfo', educationSchema)