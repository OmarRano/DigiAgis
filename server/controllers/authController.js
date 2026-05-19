const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock in-memory database
const users = [];

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

exports.signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, userType } = req.body;

    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userType,
      isVerified: userType === 'agent' ? false : true,
      certificationFile: req.file ? req.file.path : null,
      joinDate: new Date().toISOString()
    };

    users.push(newUser);

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1d' });

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
