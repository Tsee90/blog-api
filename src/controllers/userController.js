const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../services/userServices');
const passportLocal = require('../config/passport-local');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.createUser(email, hashedPassword);
    return res.status(201).json(newUser);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error creating user', details: err.message });
  }
};

exports.login = async (req, res, next) => {
  console.log('logging in...');
  passportLocal.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return res.json({ token, user });
  })(req, res, next);
};

exports.updatePassword = async (req, res) => {
  try {
    console.log('req.user:', req.user);
    const userId = req.user.id;
    const { password } = req.body;
    console.log(userId, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.updateUserPassword(userId, hashedPassword);
    return res.json({ message: 'Password updated successfully' });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error updating password', details: err.message });
  }
};

exports.updateEmail = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email } = req.body;
    const updatedUser = await db.updateUserEmail(userId, email);
    return res.json({
      message: 'Email updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error updating email', details: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.user.id) {
      return res
        .status(403)
        .json({ message: 'Not authorized to delete this user' });
    }
    console.log(req.user.id);
    await db.deleteUser(req.user.id);
    return res.status(204).send();
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error deleting user', details: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await db.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error fetching user', details: err.message });
  }
};
