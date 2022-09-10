const Skill = require('../models/skillModel')

const skillCtrl = {
    getSkills: async(req, res) => {
        try {
            const skills = await Skill.find()
            res.json(skills)
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    // if user have role = 1  => admin
    // only admin can create, update and delete skill
    createSkills: async(req, res) => {
        try {
            const { name } = req.body
            const skill = await Skill.findOne({name})
            if (skill) return res.status(400).json({msg: "This category already exists."})

            const newSkill = new Skill({name})

            await newSkill.save()
           res.json({msg: "Create a skill"})
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    deleteSkills: async(req, res) => {
        try {
            await Skill.findByIdAndDelete(req.params.id)
            res.json({msg: "Delete a skill."})
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateSkills: async(req, res) => {
        try {
            const {name} = req.body
            await Skill.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Update a skill"})
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    
}

module.exports = skillCtrl