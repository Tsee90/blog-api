const db = require('../services/postServices');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await db.createPost(title, content, req.user.id);
    return res.status(201).json(newPost);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error creating post', details: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedPost = await db.updatePostContent(id, title, content);
    return res.json({
      message: 'Post updated successfully',
      post: updatedPost,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error updating post', details: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await db.deletePost(id);
    return res.status(204).send();
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error deleting post', details: err.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await db.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.json(post);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error fetching post', details: err.message });
  }
};

exports.getAllPublishedPosts = async (req, res) => {
  try {
    const posts = await db.getAllPublishedPosts();
    return res.json(posts);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error fetching published posts', details: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await db.getAllPosts();
    return res.json(posts);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error fetching posts', details: err.message });
  }
};

exports.publishPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { published } = req.body;
    const updatedPost = await db.publishPost(id, published);
    return res.json({
      message: `Post ${published ? 'published' : 'unpublished'} successfully`,
      post: updatedPost,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error updating post status', details: err.message });
  }
};
