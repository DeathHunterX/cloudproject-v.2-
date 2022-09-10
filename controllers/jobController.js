const Jobs = require('../models/jobModel')
const Posts = require('../models/postModel')

class APIFeature{
    constructor (query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString} // queryString = req.query
        // console.log({before: queryObj})   // before delete page

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        // console.log({after: queryObj})   // after delete page

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        // console.log({queryStr})

        //  gte = Greater than or equal
        //  lte = Lesser than or equal
        //  gt = Greater than
        //  lt  = Lesser than
        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting(){
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)

        return this;
    }
}

const jobCtrl = {
    applyJob: async (req, res) => {
        try {
            const postId = req.params.id
            const { dateOfJoining, sop } = req.body
            

            const appliedJob = await Jobs.findOne({
                userId: req.user._id,
                postId: postId,
                status: {
                    $nin: ["deleted", "accepted", "cancelled"],
                },
            })
            if (appliedJob !== null) return res.status(400).json({msg: "You have already applied for this job."})


            const post = await Posts.findOne({_id: postId})
            // console.log(post.userId)
            if(post === null) return res.status(400).json({msg: "Job does not exist"})

            const activeJobCount = await Jobs.countDocuments({
                postId: postId,
                status: {
                    $nin: ["rejected", "deleted", "cancelled", "finished"],
                },
            })


            if (activeJobCount < post.maxApplicants){
                const myActiveJobCount = await Jobs.countDocuments({
                    userId: req.user._id,
                    status: {
                        $nin: ["rejected", "deleted", "cancelled", "finished"],
                    },
                })

                if (myActiveJobCount < 10) {
                    const acceptedJobs = await Jobs.countDocuments({
                        userId: req.user._id,
                        status: "accepted",
                    })

                    if (acceptedJobs === 0) {
                        const newJobApply = new Jobs({
                            userId: req.user._id,
                            postId: postId,
                            recruiterId: post.userId,
                            status: "applied",
                            sop,
                            dateOfJoining
                        })
                        
                        await newJobApply.save()
                        res.json({
                            msg: "Apply job successful.",
                            newJobApply
                        })
                    }
                    else {
                        return res.status(400).json({msg:"You already have an accepted job. Hence you cannot apply."});
                    }
                }
                else {
                    return res.status(400).json({msg:"You have 10 active applications. Hence you cannot apply."});
                }
            }
            else {
                return res.status(400).json({msg: "Application limit reached"})
            }   
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    getJob: async (req, res) => {
        try {
            const job = await Jobs.find({postId: req.params.id})
            .populate("userId", "avatar username fullname rating")
            .populate("postId", "userId title description salary skillRequired jobType duration")

            if(!job) return res.status(400).json({msg: "You don't apply any job"})

            res.json({
                result: job.length,
                job
                
            })
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getJobs: async (req, res) => {
        try {
            const features = new APIFeature(Jobs.find({userId: req.user._id})
            .populate("userId", "avatar username fullname")
            .populate("postId", "userId title description salary skillRequired jobType duration")
            , req.query)
            .filtering()
            .sorting()
            .paginating()
            

            const jobs = await features.query

            res.json({
                msg: "Success!",
                result: jobs.length,
                jobs
            })
        }
        catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateJobs: async (req, res) => {
        try {
            const user = req.user
            const id = req.params.id
            const status = req.body.status

            // "applied", // when a applicant is applied
            // "shortlisted", // when a applicant is shortlisted
            // "accepted", // when a applicant is accepted
            // "rejected", // when a applicant is rejected
            // "deleted", // when any job is deleted
            // "cancelled", // an application is cancelled by its author or when other application is accepted
            // "finished", // when job is over
            if (!user._id)res.status(400).json({msg: "You don't have permissions to update job status"})

            if (status === "accepted"){
                const job = await Jobs.findOne({
                    _id: id,
                    recruiterId: user._id
                })

                if (job === null) {
                    return res.status(400).json({msg: "Job is not found"})
                }

                const post = await Posts.findOne({
                    _id: job.postId,
                    userId: user._id
                })

                if (post === null) {
                    return res.status(400).json({msg: "Post does not exist"})
                }

                const activeJobCount = await Jobs.countDocuments({
                    recruiterId: user._id,
                    postId: post._id,
                    status: "accepted"
                })

                if(activeJobCount < post.maxPositions){
                    // const { status, dateOfJoining } = req.body
                    
                    // await Jobs.findOneAndUpdate(id, {
                    //     status, dateOfJoining
                    // })

                    job.status = status;
                    job.dateOfJoining = req.body.dateOfJoining;

                    await job.save()
                    // res.json({job})
                    
                    // console.log(job.id)

                    await Jobs.updateMany({
                        _id: {$ne: job._id},
                        userId: job.userId,
                        status: {
                        $nin: [
                            "rejected",
                            "deleted",
                            "cancelled",
                            "accepted",
                            "finished",
                        ]}
                    },
                    {
                        $set: {
                            status: "cancelled",
                        },
                    }, 
                    { multi: true })

                    if (status === "accepted") {
                        await Posts.findOneAndUpdate({_id: post._id, userId: user._id},
                            {   
                                $set: {
                                acceptedRecruiters: activeJobCount + 1
                                }
                            }
                        )
                        res.json({msg: `Job ${status} successfully`})
                    } 
                    else {
                        res.json({msg: `Job ${status} successfully`})
                    }
                } 
                else {
                    res.json({msg: "All positions for this job are already filled."})
                }

            } 
            
            else if (status === "rejected" || status === "deleted" || status ==="cancelled") {
                // console.log(id)
                // console.log(user._id)

                const tmp = await Jobs.findOneAndUpdate({
                    _id: id,
                    userId: user._id
                },
                {
                    $set: {
                      status: status,
                    },
                })

                res.json({msg: `Job ${status} successfully`})
            }

            else {
                const job = await Jobs.findOneAndUpdate({
                    _id: id, 
                    recruiterId: user._id,
                    status: {
                        $nin: ["rejected", "deleted", "cancelled"],
                    },
                },
                {
                   $set: {status: status}
                }
                )
                // console.log({job})

                if (job === null){
                    res.json({msg: "Job status cannot be updated."})
                }

                if (status === "finished") return res.json({msg: `Job ${status} successfully`})
                else return res.json({msg: `Job ${status} successfully`})
            }

            
            // else {
            //     res.status(400).json({msg: "You don't have permissions to update job status"})
            // }

        }
        catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getCandidate: async(req, res) => {
        try {
            const user  = req.user
            if (!user._id) return res.status(400).json({msg: "You don't have permissions to update job status"})

            const jobApplicant = await Jobs.find({
                postId: req.params.id,
                recruiterId: user._id,
                status: "accepted"
                // { $in: ["accepted", "finished"]}
            })
            .populate("userId", "avatar username fullname")
            .populate("postId", "userId title description salary skillRequired jobType duration")
            
            // if (jobApplicant.length === 0) return res.status.json({msg: "No candidates found"})

            res.json({
                msg: "Success!",
                result: jobApplicant.length,
                jobApplicant
            })

            // const jobApplicant = await Jobs.aggregate([
            //     {
            //         $lookup: {                          // https://www.mongodb.com/docs/rapid/reference/operator/aggregation/lookup/
            //             from: "users",
            //             localField: "userId",
            //             foreignField: "_id",
            //             as: "user_docs"
            //         }
            //     },
            //     { $unwind: "$user_docs"},                // https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/
            //     {
            //         $lookup: {
            //             from: "posts",
            //             localField: "postId",
            //             foreignField: "_id",
            //             as: "post_docs"
            //         }
            //     },
            //     { $unwind: "$post_docs"},
            //     { $match: findParams },
            //     { $sort: sortParams },
            //     { $project: {                             // https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/
            //         _id: 1,
            //         userId: 1,
            //         postId: 1,
            //         status: 1,
            //         "user_docs.username": 1,
            //         "user_docs.avatar": 1,
            //         "post_docs.title": 1
            //     }}
            // ])
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    

    
}

module.exports = jobCtrl