
const mongoose = require('mongoose');

const postSchema= new mongoose.Schema({
    author:{
        type:String,
        reqired:true,
    },
    date:{
        type:Date,
        default:Date.now,
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
      
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;