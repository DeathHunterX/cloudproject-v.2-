const Experiences = require('../../models/userFunction/experienceModel')
const Users = require('../../models/userModel')


class APIFeature{
    constructor (query, queryString){
        this.query = query;
        this.queryString = queryString;
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
}


const educationCtrl = {
    createExperience: async (req,res) => {
        try{
            const { workPlace, workName, startYear, endYear, achievement } = req.body


            if( !workPlace || !workName || !startYear || !endYear || !achievement) return res.status(400).json({msg: "Please fill in all fields."})
            if (startYear > endYear) return res.status(400).json({msg: "End year should be greater than or equal to Start year"})
            
            const newExperience = new Experiences({
                userId: req.user._id, workPlace, workName, startYear, endYear, achievement
            })
            // console.log(newExperience)
            await Users.findOneAndUpdate({_id: req.user._id}, {
                $push: {experience: [newExperience._id]}
            }, {new: true})
            
            await newExperience.save()
            res.json({
                msg: "Added Complete!",
                newExperience
            })
        }
        catch(err) {
            res.status(500).json({msg: err.message})
        }
    },
    getExperience: async (req, res) => {
        try {
            const features = new APIFeature(Experiences.find({userId: req.user._id}), req.query)
            .sorting()
            
            const experiences = await features.query

            res.json({
                msg: "Success!",
                result: experiences.length,
                experiences
            })
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    updateExperience: async (req,res) => {
        try{
            const { workPlace, workName, startYear, endYear, achievement } = req.body
            
            if( !workPlace || !workName || !startYear || !endYear || !achievement) return res.status(400).json({msg: "Please fill in all fields."})
            if (startYear > endYear) return res.status(400).json({msg: "End year should be greater than or equal to Start year"})

            await Experiences.findOneAndUpdate({
                _id: req.params.id, userId: req.user._id
            }, {workPlace, workName, startYear, endYear, achievement})

            res.json({msg: "Update Success!"})
        }
        catch(err) {
            res.status(500).json({msg: err.message})
        }

        
    },
    deleteExperience: async (req,res) => {
        try{
            await Experiences.findByIdAndDelete(req.params.id)

            await Users.findOneAndUpdate({_id: req.user._id}, {
                $pull: {experience: req.params.id}
            })

            res.json({msg: 'Deleted Experience!'})
        }
        catch(err) {
            res.status(500).json({msg: err.message})
        }
    }

}

module.exports =  educationCtrl