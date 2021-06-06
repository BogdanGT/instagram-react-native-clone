const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    photoName:String,
    description:String,
    whoLikes:Array,
    like:Number,
    comments:Array
},{collection:"Posts"})

const Post = mongoose.model("Post" , postSchema)

module.exports = Post