const Users = require('../models/userModel')
const Educations = require('../models/userFunction/educationModel')
const Experiences = require('../models/userFunction/experienceModel')


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

        // //  gte = Greater than or equal
        // //  lte = Lesser than or equal
        // //  gt = Greater than
        // //  lt  = Lesser than
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

const userCtrl = {
    searchUser: async (req, res) => {
        try {
            const users = await Users.find({username: {$regex: req.query.username}})
            .limit(10).select("username fullname avatar")

            res.json({users})
        }
        catch (err){
            return res.status(500).json({msg: err.message})
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select('-password')

            if(!user) return res.status(400).json({msg: "User does not exist."})


            res.json({user})
        }
        catch (err){
            return res.status(500).json({msg: err.message})
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const features = new  APIFeature(Users.find().select('-password'), req.query)
            .filtering()
            .sorting()
            .paginating()

            const users = await features.query

            res.json({
                result: users.length,
                users
            })
        }
        catch (err){
            return res.status(500).json({msg: err.message})
        }
    },

    updateUser: async (req, res) => {
        try {
            const { avatar, fullname, mobile, address, description, gender } = req.body

            if(!fullname) return res.status(400).json({msg: "Please add your full name."})
            if (!validatePhone(mobile)) return res.status(400).json({msg: "Phone number is invalid."})
            await Users.findOneAndUpdate({_id: req.user._id}, {
                avatar, fullname, mobile, address, description, gender
            })

            res.json({msg: "Update Success!"})

        }
        catch (err){
            return res.status(500).json({msg: err.message})
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await Users.findByIdAndDelete(req.params.id)

            await Educations.deleteMany({_id: {$in: user.education}})
            await Experiences.deleteMany({_id: {$in: user.experience}})

            res.json({msg: "Deleted Success!"})
        }
        catch (err){
            return res.status(500).json({msg: err.message})
        }
    },

}

function validatePhone(phone) {
    const re = /\+\d{1,3}\d{10}/
    return re.test(phone)
}

module.exports = userCtrl