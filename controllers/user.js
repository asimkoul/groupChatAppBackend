const user=require('../models/user')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

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
        const User=await user.findAll({where:{email}})
            if(User.length>0){
                bcrypt.compare(password,User[0].password,(err,result)=>{
                    if(err){
                        throw new Error('Something went wrong')
                    }
                    if(result==true){
                        res.status(200).json({success:true, message:'User logged in successfully',token:generateAccessToken(User[0].id)})
                    }
                    else{
                        return res.status(400).json({success:false, message:'Password is incorrect'})
                    }
                })
            }else{
                return res.status(404).json({success:false, message:'User does not exist'})
            }
    } catch (error) {
        res.status(500).json({message:error,success:false})
        console.log(error)
    }
}