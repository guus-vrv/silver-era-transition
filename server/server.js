require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // to handle cross origin requests
const path = require('path');


const app = express();

// Connect to MongoDB
connectDB();

// Initialize Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/uploads', require('./routes/uploads'));

// Make upload reports url available for site
app.use('/upload-file', express.static(path.join(__dirname, 'upload-file'), {
    setHeaders: (res, filePath) => {
      const fileName = path.basename(filePath);  // originele bestandsnaam
      res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);  // inline betekent tonen in browser
      res.setHeader('Content-Type', 'application/octet-stream'); // Dit kan ook helpen om bestandstype te identificeren
    }
  }));

app.use('/api/user', require('./routes/user'));
app.use('/api/message', require('./routes/message'));
app.use('/api/groupchat', require('./routes/groupchat'));
app.use('/api/room', require('./routes/room'));
app.use('/api/profiles', require('./routes/profiles')); // Add this line to use profiles routes


// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
