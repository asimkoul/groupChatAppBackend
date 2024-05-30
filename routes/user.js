const express=require('express')
const router=express.Router()

const userauthentication = require('../middleware/auth')
const userController=require('../controllers/user')

router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.get("/online-users", userauthentication.authenticate,userController.getOnlineUsers);


module.exports=router