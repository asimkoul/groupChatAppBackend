const express=require('express')
const dotenv=require('dotenv')
dotenv.config()
const cors=require('cors')
const bodyParser=require('body-parser')
const sequelize=require('./util/database')
const app=express()

const userRoutes=require('./routes/user')
const messageRoutes=require('./routes/message')
const groups = require("./routes/group");


const User=require('./models/user')
const Messages=require('./models/message')
const Group=require('./models/group')
const GroupMember=require('./models/groupMember')

app.use(bodyParser.json())
app.use(cors({
origin: "*",
credentials: true
}));

app.use('/message',messageRoutes)
app.use('/user',userRoutes)
app.use(groups)

User.hasMany(Messages);
Messages.belongsTo(User);
Group.belongsToMany(User, { through: GroupMember });
User.belongsToMany(Group, { through: GroupMember });
Group.hasMany(Messages);
Messages.belongsTo(Group);


sequelize.sync()
// sequelize.sync({force:true})

.then(result=>{
    app.listen(3000,()=>{
        console.log('server started')
    })
})
.catch(err=> console.log(err))