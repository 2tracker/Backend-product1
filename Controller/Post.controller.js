const Post = require("../Model/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, content,userId} = req.body;
    const imageUrls = req.files["imageUrl"] ? req.files["imageUrl"][0] : null;
    const post = new Post({
      title,
      content,
      userId,
      imageUrl: imageUrls,
    });
    await post.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating Post" });
  }
};

exports.getAllPost = async (req, res) => {
    try {
      const posts = await Post.find();
      if(posts){
      res.status(201).send({ MSG:"All POst Finded",data:posts});
      }else{
        res.status(201).send({ MSG:" POst is Not Avalible"});
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching blogs" });
    }
  };


  exports.updatePost = async (req, res) => {
    try {
      const PostId = req.params.id;
      const { title, content } = req.body;
      const imageUrls = req.files["imageUrl"] ? req.files["imageUrl"][0] : null;
      const updateData = {
        title,
        content,
      };
      if (imageUrls) {
        updateData.imageUrl = imageUrls;
      }
      const post = await Post.findById(PostId);
      if (!post) {
        return res.status(404).json({ message: "post not found" });
      }
      Object.assign(post, updateData);
      await post.save();
      res.json({ message: "post updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating blog" });
    }
  };


  exports.deletePost = async (req, res) => {
    try {
      const { id } = req.params;
      await Post.findByIdAndDelete(id);
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting post" });
    }
  };

  exports.Postlike = async (req, res) => {
    try {
      const PostId = req.params.id;
      const userId = req.body.userId;
      const post = await Post.findById(PostId);
      if (!post) {
        return res.status(404).json({ message: "post not found" });
      }
  
      if (post.likes.includes(userId)) {
        return res.status(400).json({ message: "Already liked" });
      }
      post.likes.push(userId);
      await post.save();
  
      res.json({ message: "post liked successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error liking post" });
    }
  };

  exports.PostComment = async (req, res) => {
    try {
    const PostId = req.params.id;
    const userId = req.body.userId;
    const { text } = req.body;
    const post = await Post.findById(PostId);
  
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
  
    const newComment = {
      userId,
      text,
      createdAt: new Date(),
    };
    post.comments.push(newComment);
    await post.save();
  
    res.json({ message: "Comment added successfully" });
    } catch (err) {
      res.status(500).json({ message: 'Error adding comment' });
    }
  };
  
  exports.Postshare = async (req, res) => {
    try {
      const PostId = req.params.id;
      const userId = req.body.userId;
      const post = await Post.findById(PostId);
  
      if (!post) {
        return res.status(404).json({ message: "post not found" });
      }
  
      post.shares.push(userId);
      await post.save();
  
      res.json({ message: "post shared successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error sharing post" });
    }
  };
