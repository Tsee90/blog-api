const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../services/postServices');

exports.post = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await db.createPost(title, content, req.user.id);
    console.log(post);
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};
