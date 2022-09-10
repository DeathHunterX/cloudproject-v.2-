const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    salary:{type: Number},
    user: {type: mongoose.Types.ObjectId, ref: "user"}
    


}, {timestamps: true})

module.exports = mongoose.model("comment", commentSchema)