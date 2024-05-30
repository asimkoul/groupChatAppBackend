 const express=require('express')
 const cors=require('cors')
 const bodyParser=require('body-parser')
 const userRoutes=require('./routes/user')
 const sequelize=require('./util/database')
 const app=express()

 app.use(bodyParser.json())
 app.use(cors({
    origin: "*",
    credentials: true
}));
 app.use('/user',userRoutes)
 sequelize.sync()
.then(result=>{
     app.listen(3000,()=>{
         console.log('server started')
     })
})
.catch(err=> console.log(err))