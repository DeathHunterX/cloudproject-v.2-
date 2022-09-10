const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["post", "user"],
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    },
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
    }
}, {
    timestamps: true
})
ratingSchema.index({ category: 1, receiverId: 1, senderId: 1 }, { unique: true });

module.exports = mongoose.model("rating", ratingSchema)