const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

const multer = require("multer")
const { remove } = require("../models/User")
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"Images")
    },
    filename:(req,file,cb) => {
        cb(null , Date.now() + '.jpg')
    }
})
var upload = multer({storage})

router.post("/login" , async (req,res) => {
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(!user){
        res.status(500).json({msg:"Userul sau parola nu este buna"})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch)

    if(!isMatch){
        res.status(500).json({msg:"Userul sau parola nu este buna"})
    }

    let payload = {
        user:{
            id:user._id
        }
    }

    jwt.sign(payload , "MYSECRETKEY" , {expiresIn:"7d"} , (err,token) => {
        res.status(200).json({token})
    })
})



router.post("/register" ,upload.single("file"), async (req,res) => {
    const {email,username,password} = req.body
    const profilePhoto = req.file.filename

    const newUser = await User.create({
        email,
        username,
        password,
        profilePhoto,
        followers:0,
        following:0,
        followedPeople:[],
        followersPeople:[]
    })
    console.log(req.file,req.body)

    newUser.password = await bcrypt.hash(password , 12)

    await newUser.save()

    let payload = {
        user:{
            id:newUser._id
        }
    }

    jwt.sign(payload, "MYSECRETKEY", {expiresIn:"7d"} , (err,token) => {
        console.log(token)
        res.status(200).json({token})
    })
})

router.get("/user" ,auth, async (req,res) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({user})
})

router.get("/follow/:user_id" , auth, async (req,res) => {
    const followUser = await User.findById(req.params.user_id)
    const user = await User.findById(req.user.id)

    const isFollowed = user.followedPeople.includes(req.params.user_id)


    if(isFollowed){
        user.following--
        followUser.followers--
        const removeIndex = user.followedPeople.map(el => el._id.toString()).indexOf(req.params.user_id)
        user.followedPeople.splice(removeIndex , 1)
        const removeIndex2 = followUser.followersPeople.map(el => el._id.toString()).indexOf(req.params.user_id)
        followUser.followersPeople.splice(removeIndex2 , 1)
    }else{
        user.following++
        followUser.followers++
        user.followedPeople.push(followUser._id)
        followUser.followersPeople.push(user._id)
    }
    
    await followUser.save()
    await user.save()
})

router.get("/getFollowing/:user_id" , auth , async (req,res) => {
    const user = await User.findById(req.params.user_id)

    user.followedPeople.map(async el => {
        const getUser = await User.findById(el)
        res.status(200).json([{username:getUser.username , photo:getUser.profilePhoto,id:getUser._id}])
    })
})

router.get("/getFollowers/:user_id" , auth , async (req,res) => {
    const user = await User.findById(req.params.user_id)

    user.followersPeople.map(async el => {
        const getUser = await User.findById(el)
        res.status(200).json([{username:getUser.username , photo:getUser.profilePhoto,id:getUser._id}])
    })
})

router.get("/user/:user_id" , auth , async (req,res) => {
    const user = await User.findById(req.params.user_id)

    res.status(200).json({user})
})

module.exports = router