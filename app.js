 const express=require('express')
 const cors=require('cors')
 const bodyParser=require('body-parser')
 const sequelize=require('./util/database')
 const app=express()

 const userRoutes=require('./routes/user')
 const messageRoutes=require('./routes/message')

 const User=require('./models/user')
 const Messages=require('./models/message')

 app.use(bodyParser.json())
 app.use(cors({
    origin: "*",
    credentials: true
}));

 app.use('/message',messageRoutes)
 app.use('/user',userRoutes)

 User.hasMany(Messages);
 Messages.belongsTo(User);

 sequelize.sync()
.then(result=>{
     app.listen(3000,()=>{
         console.log('server started')
     })
})
.catch(err=> console.log(err))