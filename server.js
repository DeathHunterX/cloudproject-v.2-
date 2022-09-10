require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const SocketServer = require('./socketServer')

const path  = require('path')

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))


// Socket
const {Server} = require('socket.io')
const http = require('http').createServer(app)
const io = new Server(http, {
    cors: {
        origin: "http://localhost:3000"
    },
})


io.on("connection", (socket) => {
    SocketServer(socket)
})



// Routes
app.use('/api', require('./routes/authRouter'))                         // Authentication Router
app.use('/api', require('./routes/userRouter'))                         // User Router
app.use('/api', require('./routes/skillRouter'))                        // Skill Router
app.use('/api', require('./routes/postRouter'))                         // Post Router
app.use('/api', require('./routes/jobRouter'))                          // Job Apply Router
app.use('/api', require('./routes/ratingRouter'))                       // Rating Router
app.use('/api', require('./routes/userFunction/educationRouter'))       // Education Router
app.use('/api', require('./routes/userFunction/experienceRouter'))      // Experience Router
app.use('/api', require('./routes/messageRouter'))                      // Message Router


app.use('/api', require('./routes/uploadImg'))                          //Upload Image


// Connect to MongoDB
const mongoose = require('mongoose');
//the user name and key will be hidden on the development branch
const mongoDB = process.env.DB_ROOT || 'mongodb+srv://backend01:backend0123456789@cluster0.2klbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB); // No more deprecation warning options from version 6.2.8. More Info: https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
let db = mongoose.connection;
db.on('error', console.error.bind(console,'MongoDB connection error:'));
db.once("open", function(){
    console.log("we are in MongoDB");
});

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

http.listen(port, () => {
    console.log("Server is running on port", port);
})
