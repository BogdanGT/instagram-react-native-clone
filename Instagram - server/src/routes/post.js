const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const Post = require("../models/Post")
const User = require("../models/User")
const mongoose = require("mongoose")

const multer = require("multer")
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"Images")
    },
    filename:(req,file,cb) => {
        cb(null , Date.now() + '.jpg')
    }
})
var upload = multer({storage})

router.post("/post" ,[auth,upload.single("file")], async (req,res) => {
    const {description} = req.body
    const filename = req.file.filename

    const user = await User.findById(req.user.id)

    const newPost = await Post.create({
        user:req.user.id,
        photoName:filename,
        description,
        like:0,
        whoLikes:[],
        comments:[]
    })
    
    await newPost.save()
})

router.get("/post" ,auth , async (req,res) => {
    const allPost = await Post.find({}).populate("user")
    console.log(allPost)
    res.status(200).json({allPost})
})

router.get("/post/user/:user_id" ,auth, async (req,res) => {
    const userId = req.params.user_id

    const allPosts = await Post.find({user:userId}).populate("user" , ["username" , "profilePhoto"])
    console.log(allPosts)
    res.status(200).json({allPosts})
})

router.post("/post/like/:post_id" ,auth, async (req,res) => {
    const postId = req.params.post_id
    const post = await Post.findById(postId)
    const user = await User.findById(req.user.id)

    let isLiked = user.likedPosts.includes(post._id)

    if(!isLiked){
        user.likedPosts.push(post._id)
        post.whoLikes.push({username:user.username,photo:user.profilePhoto,userId:user._id})
        post.like++
        console.log("New Like")
    }else{
        const removePostIndex = post.whoLikes.map(el => el.userId.toString()).indexOf(req.user.id)
        const removeUserIndex = user.likedPosts.map(el => el._id.toString()).indexOf(post._id)
        user.likedPosts.splice(removeUserIndex , 1)
        post.whoLikes.splice(removePostIndex , 1)
        post.like--
        console.log("Unliked")
    }

    await post.save()
    await user.save()
})

router.get("/getFollowedPosts" , auth,async (req,res) => {
    const user = await User.findById(req.user.id)

    user.followedPeople.map(async el => {
        const foundUser = await Post.find({user:el}).populate("user" , ["username" , "profilePhoto"])
        res.status(200).json({foundUser})
    })
})

router.post("/addComment/:post_id" , auth,async (req,res) => {
    const post = await Post.findById(req.params.post_id)
    const user = await User.findById(req.user.id)

    post.comments.push({
        username:user.username,
        photo:user.profilePhoto,
        comment:req.body.comment ,
        userId:user._id,
        _id:mongoose.Types.ObjectId()
    })

    await post.save()
})

router.delete("/comment/:post_id/:comment_id" , auth , async (req,res) => {
    const post = await Post.findById(req.params.post_id)

    const removeIndex = post.comments.map(el => el._id.toString()).indexOf(req.params.comment_id)

    post.comments.splice(removeIndex,1)

    await post.save()
})

router.delete("/post/:post_id" , auth ,async (req,res) => {
    const postId = req.params.post_id
    await Post.findByIdAndDelete(postId)
})


module.exports = router