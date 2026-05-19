const express = require('express');
const multer = require('multer');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/signup', upload.single('certificationFile'), signup);
router.post('/login', login);

module.exports = router;
