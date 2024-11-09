const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import User model
const authMiddleware = require('../middleware/auth'); // Import your middleware
const Buyer = require('../models/Buyer'); // Import Buyer model
const Seller = require('../models/Seller'); // Import Seller model
const GroupChat = require('../models/GroupChat'); // Import the GroupChat model

const { Connection, SkippedProfile, SavedProfile } = require('../models/Message'); // Assume these models exist and are imported properly

// POST endpoint to skip a profile
router.post('/skip', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const skippedProfileId = req.body.receiverId;

    // Validate input
    if (!userId || !skippedProfileId) {
      return res.status(400).json({ error: "User ID and Skipped Profile ID are required." });
    }

    let skippedProfile = await SkippedProfile.findOne({ userId, skippedProfileId }).exec();

    if (!skippedProfile)
    {
      skippedProfile = new SkippedProfile({
        userId,
        skippedProfileId,
        skippedAt: Date.now(),
      });

      await skippedProfile.save();

      return res.status(201).json({ message: "Profile skipped successfully.", skippedProfile });
    }

    res.status(400).json({ message: "Skipped profile already exists" });
    
    // Record the skipped profile
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to skip profile." });
  }
});

// POST endpoint to skip a profile
router.post('/un-save', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const savedProfileId = req.body.receiverId;

    // Validate input
    if (!userId || !savedProfileId) {
      return res.status(400).json({ error: "User ID and savedProfileId ID are required." });
    }

    const saved = await SavedProfile.deleteOne({
      userId: userId,
      savedProfileId: savedProfileId
    });

    res.status(201).json({ message: "Profile un-saved successfully." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to skip profile." });
  }
});

router.post('/save', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const savedProfileId = req.body.receiverId;

    // Validate input
    if (!userId || !savedProfileId) {
      return res.status(400).json({ error: "User ID and savedProfileId ID are required." });
    }

    let savedProfile = await SavedProfile.findOne({ userId, savedProfileId }).exec();

    if (!savedProfile)
    {
      const savedProfile = new SavedProfile({
        userId,
        savedProfileId,
        savedAt: Date.now(),
      });

      await savedProfile.save();

      return res.status(201).json({ message: "Profile un-saved successfully.", savedProfile });
    }

    // Record the skipped profile
  
    return res.status(400).json({ message: "Saved profile already exists" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to skip profile." });
  }
});

router.get('/skipped', authMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const skippedProfiles = await SkippedProfile.find({ userId });

    const profilesWithDetails = await Promise.all(skippedProfiles.map(async (skippedProfile) => {
      const user = await User.findOne({_id: skippedProfile.skippedProfileId}); // This contains User data

      // Initialize an object to hold the response data
      const profileData = {
        skippedProfileId: skippedProfile.skippedProfileId,
        userId: skippedProfile.userId,
        skippedAt: skippedProfile.skippedAt,
        userDetails: user, // Include user details
      };

      let profile;

      // Fetch Buyer or Seller profile based on user role
      if (user.role === 'buyer') {
        profile = await Buyer.findOne({ user: user._id }).exec();

      } else if (user.role === 'seller') {
        profile = await Seller.findOne({ user: user._id }).exec();
      }

      profileData.profile = profile; // Add seller profile to response

      return profileData; // Return the constructed profile data
    }));
  
    
    res.status(200).json(profilesWithDetails);
  } catch (error) {
    console.error('Error fetching skipped profiles:', error);
    res.status(500).json({ error: 'An error occurred while fetching skipped profiles.' });
  }
});


router.get('/saved', authMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const savedProfiles = await SavedProfile.find({ userId: userId });

    const profilesWithDetails = await Promise.all(savedProfiles.map(async (savedProfile) => {
      const user = await User.findOne({_id: savedProfile.savedProfileId}); // This contains User data

      // Initialize an object to hold the response data
      const profileData = {
        savedProfileId: savedProfile.savedProfileId,
        userId: savedProfile.userId,
        savedAt: savedProfile.savedAt,
        userDetails: user, // Include user details
      };

      let profile;
      let hasConnection = false;
      let connection = await Connection.findOne({receiver: savedProfile.savedProfileId});

      if (connection)
      {
        hasConnection = true;
        const groupChat = await GroupChat.findOne({
          participants: { $all: [userId, savedProfile.savedProfileId] }
        });
        if (groupChat)
        {
          profileData.groupChat = groupChat;
        }
      }

      // Fetch Buyer or Seller profile based on user role
      if (user.role === 'buyer') {
        profile = await Buyer.findOne({ user: user._id }).exec();

      } else if (user.role === 'seller') {
        profile = await Seller.findOne({ user: user._id }).exec();
      }

      profileData.profile = profile; // Add seller profile to response
      profileData.hasConnection = hasConnection;

      return profileData; // Return the constructed profile data
    }));
  
    
    res.status(200).json(profilesWithDetails);
  } catch (error) {
    console.error('Error fetching saved profiles:', error);
    res.status(500).json({ error: 'An error occurred while fetching saved profiles.' });
  }
});



module.exports = router;