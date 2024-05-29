const Sequelize=require('sequelize')

const sequelize=new Sequelize('group-chat-app','root','Asim@1234567',{
    dialect:"mysql",
    host:'localhost'
})
module.exports=sequelize