const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../services/userServices');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.getUserByEmail(email);

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = password === user.password ? true : false;

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
  res.send('Accessed Secure');
};
