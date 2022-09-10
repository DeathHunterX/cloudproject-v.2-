require('dotenv').config()

const Users = require('../models/userModel')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const {google} = require('googleapis')
const {OAuth2} = google.auth

const {CLIENT_URL} = process.env


const authCtrl = {
    register: async (req, res) => {
        try{
            const { username, fullname, email, password, gender } = req.body
            // console.log(req.body)
            let newUserName = username.toLowerCase().replace(/ /g, ' ')
            // console.log(newUserName)

            // Authentication
            if (!username || !email || !password) return res.status(400).json({msg: "Please fill in all fields."})

            if(!validateEmail(email)) return res.status(400).json({msg: "Invalid emails."})

            const user_name = await Users.findOne({username: newUserName})
            if (user_name) return res.status(400).json({msg: "This user name already exists."})

            const user_email = await Users.findOne({ email })
            if (user_email) return res.status(400).json({msg: "This email already exists."})
            
            if (password.length < 6)
            return res.status(400).json({msg: "Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(password, 12)

            // console.log(passwordHash)

            const newUser = new Users({
                username: newUserName, fullname, email, password: passwordHash, gender
            })
            // console.log(newUser)

            const access_token = createAccessToken({id: newUser._id});
            const refresh_token = createRefreshToken({id: newUser._id});
            // console.log({access_token, refresh_token})

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000 // 30 days
            })

            await newUser.save()

            res.json({
                msg: 'Registered Success!',
                access_token,
                user:{
                    ...newUser._doc,
                    password:''
                }
            })
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    login: async (req, res) => {
        try{
            const { email, password } = req.body

            const user = await Users.findOne({email})
            // Identify populate object want to mention
            // .populate("", "-password")

            // Login Authenticated
            if (!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            // console.log(isMatch)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
        

            const access_token = createAccessToken({id: user._id});
            const refresh_token = createRefreshToken({id: user._id});
            // console.log({access_token, refresh_token})

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000 // 30 days
            })
            
            res.json({
                msg: 'Login Success!',
                access_token,
                user:{
                    ...user._doc,
                    password:''
                }
            })
        
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    logout: async (req, res) => {
        try{
            res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
            return res.json({msg: "Logged Out!"})
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getAccessToken: async (req, res) => {
        try{
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({msg: "Please login now."})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET || 'myrefreshtokensecret', async(err, result) => {
                if (err) return res.status(400).json({msg: "Please login now."})
                // console.log(result)

                const user = await Users.findById(result.id)
                if (!user) return res.status(400).json({msg: "This does not exist"})

                const access_token = createAccessToken({id: result.id})

                res.json({
                    access_token,
                    user
                })
                
            })
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const user = await Users.findOne({email})
            if (!email) return res.status(400).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}user/reset/${access_token}`

            sendMail(email, url, "Reset your password")
            res.json({msg: "Re-send the password, please check your mail."})
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }

    },
    
    resetPassword: async (req, res) => {
        try {
            const {password} = req.body
            // console.log(password)
            const passwordHash = await bcrypt.hash(password, 12)

            // console.log(req.user)
            await Users.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})

        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }

    },
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || 'myaccesstokensecret', {expiresIn: '1d'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || 'myrefreshtokensecret', {expiresIn: '30d'})

}


module.exports = authCtrl