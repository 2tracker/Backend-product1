const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId:String,
  imageUrl: Array,
  likes: Array,
  comments: Array,
  shares: Array,
});

module.exports = mongoose.model('Post', blogSchema);