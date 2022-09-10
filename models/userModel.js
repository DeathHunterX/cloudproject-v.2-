const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true,
        minLength: 3,
        maxLength: 25,
    },
    fullname:{
        type: String,
        default: "",
        minLength: 3,
        maxLength: 25,
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dyqfmg3iq/image/upload/v1650032829/Looking%20For%20Helpers/avatar/avatar_acdava.jpg"
    },
    role: {
        type: Number,
        default: 0 // 0 = user, 1 = admin
    },
    gender: {type: String, default: 'male'},
    mobile: {type: String, default: ''},
    address: {type: String, default: ''},
    description: {
        type: String,
        default: '',
        maxLength: 5000
    },

    //Experience Schema
    experience: [{type: mongoose.Types.ObjectId, ref: 'experienceInfo'}],
    // Education Schema
    education: [{type: mongoose.Types.ObjectId, ref: 'educationInfo'}],

    skills: [String],
    rating: {
        type: Number,
        max: 5.0,
        default: 0.0,
        validate: {
            validator: function(v) {
                return  v >= -1.0 && v <= 5.0
            },
            msg: "Invalid rating"
        }
    },
    resume: {type: String},
}, {
    timestamps: true
})

module.exports = mongoose.model("user", userSchema)