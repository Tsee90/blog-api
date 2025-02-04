const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../services/userServices');

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.createUser(email, hashedPassword);
    console.log(user);
    res.redirect('/');
  } catch (err) {
    return err;
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.getUserByEmail(email);

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};

exports.getSecure = async (req, res) => {
  console.log('Accessign Secure...');
  if (req.user) {
    res.json({
      message: 'Access Granted',
      user: req.user,
    });
  } else {
    res.json({ message: 'Access Denied' });
  }
};
