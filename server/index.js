const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require("socket.io");
const UserRouter = require("./Routes/userRoutes");
const PostRouter = require("./Routes/postRoutes");
const CommentRouter = require("./Routes/commentRoutes");
const DmMessage = require("./Routes/directMessagesRoutes");
const CMSFunc = require("./Utils/most-popular-first-names");
const {onConnection} = require("./Controllers/socketManager");
// const User = require("./Controllers/userController");


const port = process.env.port || 5000;
const db = 'mongodb+srv://admin:1234@lulilanddb.j4tppp6.mongodb.net/?retryWrites=true&w=majority'
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json({ extended:true }));
app.use(express.urlencoded({ extended:true }));
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
io.on('connection', onConnection);

app.use('/users', UserRouter);
app.use('/posts', PostRouter);
app.use('/comments', CommentRouter);
app.use('/dm', DmMessage);

app.get('/',(req, res) => {res.send('Im alive');});
mongoose.connect(db,{ useUnifiedTopology: true, useNewUrlParser: true}).then(()=>server.listen(port, ()=>{
    console.log(`server is running on port: http://127.0.0.1:${port}`);
})).catch((err)=>console.log('dont succeed to connect'));

module.exports = {io}

// User.getMostActiveUsers(null, null);