
const express = require('express');

const postController = require('../controller/postController.js');
const {protectedRoute} = require('../middlewares/protectedRoute.js')
const { uploadToServer } = require("../middlewares/multer");

const router = express.Router();

router.get('/:id', postController.getSinglePosts)
router.get('/get-all-posts',postController.getAllPosts);
router.get('/post-by-author', protectedRoute,postController.postByAuthor)

router.post('/', protectedRoute, postController.createPost);

router.delete('/:id', protectedRoute, postController.deletePost);
router.patch('/:id', protectedRoute, postController.editPost);

router.patch('/upload-img/:id', protectedRoute, uploadToServer, postController.uploadImage);


module.exports = router; 