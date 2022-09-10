const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref:'user',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description: {type: String},
    images: {
        type: Array,
        default: []
    },
    salary: {type: Number},
    currency: {type: String},
    comment:[{ type: mongoose.Types.ObjectId, ref: 'comment'}],
    maxApplicants:{type: Number},       // Maximum number of job applicants to submit
    maxPositions: {type: Number},       // Maximum number of people for the position to be recruited
    acceptedRecruiters:{                // Number of applicants accepted
        type: Number,
        default: 0
    },
    dateOfPosting: {
        type: Date,
        default: Date.now()
    },
    deadlines: {
        type: Date,
        min: Date.now(),
        validate: [{
            validator: function(value) {
                return this.dateOfPosting < value
            },
            msg: "Deadlines should be greater than date of posting."
        }]
    },
    skillRequired: [String],
    jobType: {
        type: String,
        // required: true
    },
    duration:{
        type: Number,
        min: 0
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
    },


}, {
    timestamps: true
})

postSchema.index({title: 'text'})

const Posts = mongoose.model("post", postSchema)
Posts.createIndexes({title: 'text'})
module.exports = Posts

// module.exports = mongoose.model("post", postSchema)