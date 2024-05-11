const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const Post = require("../server"); // Assuming your Post model is in the models directory

// Example Post model
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  }, { timestamps: true });
  const Post = mongoose.model("Post", postSchema);
  

router.post("/", async (req, res) => {
  const { title, content, category, author } = req.body;
  try {
    const newPost = new Post({ title, content, category, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
    try {
      const posts = await Post.find().populate('author', 'username');  // Only populates the 'username' field of the author
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, content, category } = req.body;
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(204).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;