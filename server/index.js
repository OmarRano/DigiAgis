require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic Health Check
app.get('/', (req, res) => {
  res.json({ message: 'DigiAGIS API is running...' });
});

const authRoutes = require('./routes/auth');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', (req, res) => res.json({ message: 'Listings endpoint' }));
app.use('/api/verifications', (req, res) => res.json({ message: 'Verifications endpoint' }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
