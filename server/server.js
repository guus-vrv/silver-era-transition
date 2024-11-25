require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // to handle cross origin requests
const path = require('path');
const next = require('next');

const app = express();
const nextApp = next({ dev: process.env.NODE_ENV !== 'production', dir: path.join(__dirname, '../landing')});
const handle = nextApp.getRequestHandler();

// Connect to MongoDB
connectDB();

// Initialize Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/uploads', require('./routes/uploads'));

app.get('/upload-file/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'upload-file', req.params.filename);
  const originalName = req.query.name || req.params.filename; // Gebruik originele naam als queryparameter indien beschikbaar
  res.download(filePath, originalName, (err) => {
    if (err) {
      res.status(500).send('Error downloading the file');
    }
  });
});

app.use('/api/user', require('./routes/user'));
app.use('/api/message', require('./routes/message'));
app.use('/api/groupchat', require('./routes/groupchat'));
app.use('/api/room', require('./routes/room'));
app.use('/api/profiles', require('./routes/profiles')); // Add this line to use profiles routes

// code hier

// Integrate Next.js
nextApp.prepare().then(() => {

  // Gebruik Express voor je routes - dit is poort 5001, de andere is poort 3000.
  app.get('/landing', (req, res) => {
    // Dit laat Next.js de /landing route renderen (SSR)
    console.log('landing');
    return nextApp.render(req, res, '/landing');
  });

  // Zorg ervoor dat andere routes door Next.js worden behandeld
  app.all('*', (req, res) => {
    return handle(req, res);  // Laat Next.js de rest van de routes beheren
  });

  // Start the server
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
