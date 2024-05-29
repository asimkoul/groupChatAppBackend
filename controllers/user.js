const user=require('../models/user')
const bcrypt = require('bcrypt')
//const jwt=require('jsonwebtoken')

function isStringValid(string) {
    if(string==undefined || string.length==0){
        return true
    }else{
        return false
    }

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
