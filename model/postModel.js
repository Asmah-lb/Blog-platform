
const mongoose = require('mongoose');

const postSchema= new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        reqired:true,
    }, 
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:[true, "Post must have a content"]
    },
    image:String,
    date:{
        type:Date,
        default:Date.now,
    },  
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;