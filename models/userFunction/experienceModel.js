const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref:'user',
        required: true
    },
    workPlace: {
        type: String,
        required: true
    },
    workName: {
        type: String,
        default: '',
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
    },
    achievement: {
        type: String,
        default: ''
    }
}, {timestamps: true})

module.exports = mongoose.model('experienceInfo', experienceSchema)