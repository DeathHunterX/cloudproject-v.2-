const Ratings = require('../models/ratingModel')

const Jobs = require('../models/jobModel')
const Users = require('../models/userModel')
const Posts = require('../models/postModel')
const mongoose = require('mongoose')


const ratingCtrl = {
    addUpdateCandidateRating: async (req, res)  => {
        try {
            const user = req.user;
            const data = req.body;
            
            const rating = await Ratings.findOne({
                senderId: user._id,
                receiverId: data.userId,
                category: "user",
            })
            
            // console.log(data.userId)
            // console.log(user._id)
            // console.log(rating)

            if (rating === null){
                console.log("new rating")
                const acceptedApplicant = await Jobs.countDocuments({
                    userId: data.userId,
                    status: {
                        $in: ["accepted", "finished"],
                    }
                })
                // console.log(acceptedApplicant)
                if (acceptedApplicant > 0) {
                    const newRating = new Ratings({
                        category: "user",
                        senderId: user._id,
                        receiverId: data.userId,
                        rating: data.rating,
                    })

                    // console.log(newRating)
                    await newRating.save()

                    const ratingResult = await Ratings.aggregate([
                        {
                            $match: {
                                receiverId: mongoose.Types.ObjectId(data.userId),
                                category: "user"
                            }
                        },
                        {
                            $group: {
                                _id: {},
                                average: { $avg: "$rating" }
                            }
                        }
                    ])
                    // console.log(ratingResult)
                    if (ratingResult === null) return res.status(400).json({msg: "Error while calculating rating"})

                    const avg = ratingResult[0].average;

                    const candidates = Users.findOneAndUpdate({_id: data.userId},
                        {
                            $set: {
                                rating: avg
                            }
                        }
                    )
                    console.log(candidates)
                    if (candidates === null) return res.status(400).json({msg: "Error while updating candidate's average rating"})
                    
                    res.json({msg: "Rating added successfully."})

                }
                else {
                    // You cannot rate
                    return res.status(400).json({msg: "Candidate didn't worked under you. Hence you cannot give a rating."})
                }
            }
            else {
                //update the rating
                rating.rating = data.rating
                await rating.save()

                const ratingResult = await Ratings.aggregate([
                    {
                        $match: {
                          receiverId: mongoose.Types.ObjectId(data.userId),
                          category: "user",
                        },
                    },
                    {
                    $group: {
                        _id: {},
                        average: { $avg: "$rating" },
                    },
                    },
                ])
                // console.log(ratingResult)
                if (ratingResult === null) return res.status(400).json({msg: "Error while calculating rating."})

                const avg = ratingResult[0].average;

                const candidates = await Users.findOneAndUpdate({_id: data.userId},
                    {
                        $set: {
                            rating: avg
                        }
                    }
                )
                
                if (candidates === null) return res.status(400).json({msg: "Error while updating candidate's average rating"})
                
                res.json({msg: "Rating added successfully."})
            }  
        }
        catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    },

    addUpdatePostRating: async (req, res) => {
        try {

            const user = req.user
            const data = req.body
            
            
            const rating = await Ratings.findOne({
                senderId: user._id,
                receiverId: data.postId,
                category: "post"
            })
            
            // console.log(data.postId)
            // console.log(user._id)
            // console.log(rating)

            if (rating === null){
                console.log("new rating")
                const acceptedApplicant = await Jobs.countDocuments({
                    userId: user._id,
                    postId: data.postId,
                    status: {
                        $in: ["accepted", "finished"],
                    }
                })
                // console.log(acceptedApplicant)

                if (acceptedApplicant > 0) {
                    const newRating = new Ratings({
                        category: "post",
                        senderId: user._id,
                        receiverId: data.postId,
                        rating: data.rating
                    })

                    // console.log(newRating)
                    await newRating.save()

                    const ratingResult = await Ratings.aggregate([
                        {
                            $match: {
                                receiverId: mongoose.Types.ObjectId(data.postId),
                                category: "post",
                            },
                        },
                        {
                            $group: {
                                _id: {},
                                average: { $avg: "$rating" },
                            },
                        }
                    ])
                    // console.log(ratingResult)
                    if (ratingResult === null) return res.status(400).json({msg: "Error while calculating rating."})

                    const avg = ratingResult[0].average;

                    const foundPost = await Posts.findOneAndUpdate({_id: data.postId},
                        {
                            $set: {
                                rating: avg
                            }
                        }
                    )
                    // console.log(foundPost)
                    if(foundPost === null) return res.status(400).json({msg: "Error while updating job's average rating"})

                    res.json({msg: "Rating added successfully."})
                } else {
                    // You cannot rate
                    return res.status(400).json({msg: "You haven't worked for this job. Hence you cannot give a rating."})
                }

            }
            else {
                // update the rating
                rating.rating = data.rating
                await rating.save()

                const ratingResult = await Ratings.aggregate([
                    {
                        $match: {
                            receiverId: mongoose.Types.ObjectId(data.postId),
                            category: "post",
                        },
                    },
                    {
                        $group: {
                            _id: {},
                            average: { $avg: "$rating" },
                        },
                    },
                ])
                // console.log(ratingResult)
                if (ratingResult === null) return res.status(400).json({msg: "Error while calculating rating."})

                const avg = ratingResult[0].average;

                const foundPost = await Posts.findOneAndUpdate({_id: data.postId},
                    {
                        $set: {
                            rating: avg
                        }
                    }
                )
                
                // console.log(foundPost)
                if(foundPost === null) return res.status(400).json({msg: "Error while updating job's average rating"})

                res.json({msg: "Rating added successfully."})

            }
            
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getUserRating: async (req, res) => {
        try {
            const user = req.user

            const rating = await Ratings.findOne({
                senderId: user._id,
                receiverId: req.query.id,
                category: "user"
            })
            // console.log(rating)
            if (rating === null) return res.json({rating: -1})
            res.json({rating: rating.rating})
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getPostRating: async (req, res) => {
        try {
            const user = req.user

            const rating = await Ratings.findOne({
                senderId: user._id,
                receiverId: req.query.id,
                category: "post"
            })
            console.log(rating)
            if (rating === null) return res.json({rating: -1})
            res.json({rating: rating.rating})
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getAllUserRating: async (req, res) => {
        try {
            const rating = await Ratings.find({
                receiverId: req.params.id,
                category: "user"
            })

            if (rating === null) return res.json({rating: -1})
            res.json({
                result: rating.length,
                rating
            })
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = ratingCtrl