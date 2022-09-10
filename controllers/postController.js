const Posts = require('../models/postModel')

class APIFeature{
    constructor (query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString} // queryString = req.query
        // console.log({before: queryObj})   // before delete page

        const excludedFields = ['page', 'sort', 'limit', 'search']
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
    searching(){
        const search = this.queryString.search;
        if(search){
            this.query = this.query.find({
                $text: { $search: search }
            })
        } else {
            this.query = this.query.find()
        }
        return this;
    }
}
const postCtrl = {
    createPost: async(req, res) => {
        try {
            const { title, description, images, salary, maxApplicants, maxPositions, skillRequired, jobType, deadlines, duration } = req.body
            const newPost = new Posts({
                userId: req.user._id, title, description, images, salary, maxApplicants, maxPositions, skillRequired, jobType, deadlines, duration
            })
            // console.log(newPost)
            await newPost.save()

            res.json({
                msg: " Create Post",
                newPost
            })
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getPosts: async(req, res) => {
        try {
            const features = new APIFeature(Posts.find({userId: req.user._id}), req.query)
            .filtering()
            .sorting()
            .paginating()
            .searching()

            const posts = await features.query.populate("userId", "avatar username fullname")

            res.json({
                msg: "Success!",
                result: posts.length,
                posts
            })
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getAllPosts: async(req, res) => {
        try {
            const features = new APIFeature(Posts.find(), req.query)
            .filtering()
            .sorting()
            .paginating()
            .searching()

            const total = await Posts.countDocuments()
            const posts = await features.query.populate("userId", "avatar username fullname")
            
            res.json({
                msg: "Success!",
                result: posts.length,
                total,
                posts
            })
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    searchPost: async (req, res) => {
        try {
            const posts = await Posts.find({title: {$regex: req.query.title}})
            .limit(10)

            res.json({posts})
        }
        catch (err){
            return res.status(500).json({msg: err.message})
        }
    },

    updatePost: async(req, res) => {
        try {
            const { title, description, images, salary, maxApplicants, maxPositions, skillRequired, jobType, deadlines, duration } = req.body

            const post = await Posts.findOneAndUpdate({_id: req.params.id}, {
                title, description, images, salary, maxApplicants, maxPositions, skillRequired, jobType, deadlines, duration
            })

            res.json({
                msg: "Updated Post!",
                newPost: {
                    ...post._doc,
                    title, description, images, salary, maxApplicants, maxPositions, skillRequired, jobType, deadlines
                }
            })
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    getPost: async(req, res) => {
        try {
            // console.log(req.user)
            const post = await Posts.findById(req.params.id)
            .populate("userId", "avatar username fullname")

            if(!post) return res.status(400).json({msg: 'This post does not exist.'})
            res.json({
                post
            })
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    deletePost: async(req, res) => {
        try {
            const post = await Posts.findOneAndDelete({_id: req.params.id, userId: req.user._id})
            
            res.json({
                msg: 'Deleted Post!',
                newPost: {
                    ...post,
                    user: req.user
                }
            })
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    suggestionPosts: async(req, res) => {
        try {
            // const newArr = [...]

            const num = req.query.num || 20

            const posts = await Posts.aggregate([
                {$match: {userId: {$nin: [req.user._id]}}},
                {$sample: {size: num}},
                {$lookup: 
                    {
                        from: "posts",
                        localField: "postId",
                        foreignField: "_id",
                        as: "post_docs"
                    }
                }
            ])

            return res.json({
                result: posts.length,
                posts
                
            })


        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    

}

module.exports = postCtrl