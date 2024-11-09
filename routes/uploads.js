const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();


const sharp = require('sharp');
const fs = require('fs');


/* PROFILE PICTURE */
const storage = multer.memoryStorage(); // Store image in memory buffer

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept image files only
    } else {
      cb(new Error('Please upload an image file'), false);
    }
  }
});

// POST route for uploading profile picture
router.post('/uploadProfilePicture', upload.single('profilePicture'), async (req, res) => {
  console.log(req.file);
  if (req.file) {
    try {
      // Create a filename for the blurred image
      const blurredFileName = `blurred-${Date.now()}-${req.file.originalname}`;
      const blurredFilePath = path.join(__dirname, '..', 'uploads', blurredFileName);

      // Blur the image using sharp
      await sharp(req.file.buffer)
        .blur(20) // Adjust blur intensity as needed
        .toFile(blurredFilePath);

      // If the file was successfully processed and saved, send back its path or URL
      res.json({
        success: true,
        profilePicture: `/uploads/${blurredFileName}`, // Path where the blurred image is accessible
      });
    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ success: false, message: 'Error processing image' });
    }
  } else {
    res.status(400).json({ success: false, message: 'No file uploaded' });
  }
});

module.exports = router;