const express = require('express');
const Post = require('../Controller/Post.controller');
const multer = require('multer');
const path = require('path')

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/User/Post");
    
    },
    filename: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + Date.now() + extension);
    },
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      cb(null, true);
    },
  });

router.post('/create',upload.fields([{ name: "imageUrl" }]),Post.createPost);
router.patch('/update/:id',upload.fields([ { name: "imageUrl" }]),Post.updatePost);
router.get('/all', Post.getAllPost);
router.delete('/delete/:id', Post.deletePost);
router.post('/:id/like', Post.Postlike);
router.post('/:id/comment', Post.PostComment);
router.post('/:id/share', Post.Postshare);

module.exports = router;