const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    userId:  {
        type: mongoose.Types.ObjectId,
        ref:'user',
        required: true
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'post',
        required: true
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'post',
        required: true,
    },
    status: {
        type: String,
        enum: [
          "applied", // when a applicant is applied
          "shortlisted", // when a applicant is shortlisted
          "accepted", // when a applicant is accepted
          "rejected", // when a applicant is rejected
          "deleted", // when any job is deleted
          "cancelled", // an application is cancelled by its author or when other application is accepted
          "finished", // when job is over
        ],
        default: "applied",
        required: true,
    },
    dateOfJob: {
        type: Date,
        default: Date.now,
    },
    dateOfJoining:  {type: Date, default: ''},
    sop:            // sop: Statement of Purpose
    {
        type: String,
    
    } 


}, {timestamps: true})

module.exports = mongoose.model("job", jobSchema)