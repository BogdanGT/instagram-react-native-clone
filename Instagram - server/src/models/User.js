const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    profilePhoto:String,
    likedPosts:[],
    followers:Number,
    following:Number,
    followedPeople:Array,
    followersPeople:Array
},{collection:"Users"})

const User = mongoose.model("User" , userSchema)

module.exports = User