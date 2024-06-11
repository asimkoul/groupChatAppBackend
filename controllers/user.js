const user=require('../models/user')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const sequelize = require('../util/database')

function isStringValid(string) {
    if(string==undefined || string.length==0){
        return true
    }else{
        return false
    }

}

function generateAccessToken(id) {
    return jwt.sign({userId:id},'secretkey')
}


exports.signup=async (req,res,next)=>{
    try {
        const {name,email,password}=req.body
        if(isStringValid(name) || isStringValid(email) || isStringValid(password)){
                return res.status(400).json({err:`please complete all the input fields`})
            }
        const saltRounds=10;
        bcrypt.hash(password,saltRounds,async (err,hash)=>{
            console.log(err)
            await user.create({
                name,
                email,
                password:hash
            })
            res.status(201).json({message:'Succesfully created new user'})
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.login=async (req,res,next)=>{
    try {
        const {email,password}=req.body
        if(isStringValid(email) || isStringValid(password)){
            
            return res.status(400).json({err:`please complete all the input fields`})
        }
        const User=await user.findOne({where:{email}})
        if(!User){
            return res.status(404).json({ error: "User not found, Please Signup" });
        }
        const isPasswordValid = await bcrypt.compare(password, User.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password, Please Try Again" });
        }
        const token = generateAccessToken(User.id);
        console.log(token);
        res.status(200).send({ message: "User successfully Logged In", token});    
    }
    catch(error){
        console.log(error)
    }
}
