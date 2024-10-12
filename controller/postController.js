const sharp = require("sharp");
const Post = require("../model/postModel.js");

exports.createPost = async function (req, res) {
  try {


    const createdPost = await Post.create({
      author: req.user._id,
      content: req.body.content,
      title: req.body.title,
    });
    console.log(req.body);

    res.status(201).json({
      status: "success",
      message: "Post successfully uploaded...",
      data: {
        post: createdPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.uploadImage = async function (req, res) {
  try {
    console.log(req.file);
    if (!req.file) {
      return res.json({ message: "No image uploaded" });
    }

    const post = await Post.findOne({
      _id: req.params.id
    });
    console.log(post)
    const imageFile = `${post.title
      .split("")
      .join("-")
      .toLowerCase()}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(750, 750)
      .toFormat("jpeg")
      .jpeg({ qualify: 80 })
      .toFile(`public/assets/post/${imageFile}`);

    post.image = imageFile;
    await post.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Image uploaded successfully",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getPostByUser = async function (req, res) {
  try {
    console.log(req.user._id);
    const myPosts = await Post.find({ author: req.user._id });

    res.status(200).json({
      status: "success",
      data: {
        posts: myPosts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllPosts = async function (req, res) {
  try {
    const posts = await Post.find();

    res.status(200).json({
      status: "success",
      data: {
        posts: posts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getSinglePosts = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.editPost = async function (req, res) {
  try {
    const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      status: "success",
      message: "Post Edited!",
      data: {
        post: updatedPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deletePost = async function (req, res) {
  try {
    const posts = await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Post Deleted!",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};


