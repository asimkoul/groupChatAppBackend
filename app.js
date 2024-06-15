const express=require('express')
const dotenv=require('dotenv')
dotenv.config()
const path=require('path')
const cors=require('cors')
const bodyParser=require('body-parser')
const socket = require("socket.io");
const http = require("http");
const cron = require('cron');

const app=express()
const server = http.createServer(app);
const io = socket(server);

const sequelize=require('./util/database')
const  archiveOldMessages = require("./util/cron")
const upload = require("./routes/upload");
const userRoutes=require('./routes/user')
const groups = require("./routes/group");


const User=require('./models/user')
const Messages=require('./models/message')
const Group=require('./models/group')
const GroupMember=require('./models/groupMember')
const authenticateSocket = require("./middleware/authSocket");
const messagesSocket = require("./sockets/messageSocket");
const groupsSocket = require("./sockets/groupSocket");


app.use(bodyParser.json())
app.use(cors({
    origin: "*"
}));

app.use('/user',userRoutes)
app.use(upload);
app.use(groups)
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`public/${req.url}`))
})

User.hasMany(Messages);
Messages.belongsTo(User);
Group.belongsToMany(User, { through: GroupMember });
User.belongsToMany(Group, { through: GroupMember });
Group.hasMany(Messages);
Messages.belongsTo(Group);


sequelize.sync()
// sequelize.sync({force:true})

.then(result=>{
    server.listen(3000,()=>{
        console.log('server started')
    })
    const job = new cron.CronJob('0 0 * * *', archiveOldMessages, null, false, 'Asia/Kolkata');
    job.start();

    io.on("connection", async (socket) => {
        socket.on("message", (message) => {
            authenticateSocket(socket, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    messagesSocket.postMessages(socket, message);
                }
            });
        });

        authenticateSocket(socket, (err) => {
            if (err) {
                console.log(err);
            } else {
                socket.on("create-group", (groupData) => {
                    groupsSocket.createGroup(io, socket, groupData);
                })
                socket.on("get-groups", (cb) => {
                    groupsSocket.getAllGroups(socket, cb);
                })
                socket.on("get-messages", () => {
                    messagesSocket.getAllMessages(socket);
                })
                socket.on("user-left", () => {
                    socket.broadcast.emit("user-left", { username: socket.user.name });
                })
                socket.on("get-group-members", (groupId) => {
                    socket.join(groupId);
                    groupsSocket.getGroupMembers(socket, groupId);
                    groupsSocket.getGroupMessages(socket, groupId);
                    socket.on("post-group-message", (message) => {
                        groupsSocket.postMessages(socket, message, groupId);
                    });
                });
            }
        })
        socket.on("disconnect", () => {
        });
    })
})
.catch(err => console.error(err));