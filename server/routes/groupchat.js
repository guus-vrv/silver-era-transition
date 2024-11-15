// routes/groupChat.js
const express = require('express');
const GroupChat = require('../models/GroupChat'); // Import the GroupChat model
const User = require('../models/User'); // Import the GroupChat model
const router = express.Router();
const path = require('path');
const multer = require('multer');
const authMiddleware = require('../middleware/auth'); // Import your middleware
const Buyer = require('../models/Buyer'); // Import Buyer model
const Seller = require('../models/Seller'); // Import Seller model
const { Connection, SkippedProfile, SavedProfile } = require('../models/Message'); // Assume these models exist and are imported properly

const upload = multer({ dest: 'upload-file/', filename: function (req, file, cb) {
  // Use the original filename
  cb(null, file.originalname);
}});

// Create a new group chat - trigger when invite to connect is sent
router.post('/create-from-members', authMiddleware, async (req, res) => {

  const brokerId = req.userId;
  const members = req.body;

  console.log(req.body);

  try {
    // Create a new connection/invitation in the database

    const groupChat = new GroupChat({participants: [ brokerId, ...members ]});

    await groupChat.save();

    res.status(201).json({ message: 'Group chat created successfully!', groupChat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Create a new group chat - trigger when invite to connect is sent
router.post('/create', authMiddleware, async (req, res) => {

  const userId = req.userId;
  const receiverId = req.body.receiverId;
  let brokerId = await User.findOne({ _id: userId }).select('brokerId');
  brokerId = brokerId.brokerId.toString();

  try {
    // Create a new connection/invitation in the database

    const saved = await SavedProfile.deleteOne({
      userId: userId,
      savedProfileId: receiverId
    });

    const skipped = await SkippedProfile.deleteOne({
      userId: userId,
      skippedProfileId: receiverId
    });

    // create connection between users

    const connection = new Connection({
      sender: userId,
      receiver: receiverId,
      createdAt: Date.now(),
    });

    await connection.save();

    // create groupchat

    const groupChat = new GroupChat({participants: [ userId, receiverId, brokerId ]});

    await groupChat.save();

    res.status(201).json({ message: 'Group chat created successfully!', groupChat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL GROUPS
router.get('/groups', authMiddleware, async (req, res) => {

  let userId = req.userId;

  try {
    const groupChats = await GroupChat.find({ participants: userId });

    const profilesWithDetails = await Promise.all(groupChats.map(async (chat) => {


      
      const participants = await Promise.all(chat.participants.map(async (participant) => {

        

        const user = await User.findById(participant).exec();

        if (!user) {
          console.error('Invalid user for participant ID:', participant);
          return null; // Skip invalid users
        }

        //console.log('USER', user);

        const profileData = {
          userId: participant,
          userDetails: user, // Include user details
        };
  
        let profile;
  
        // Fetch Buyer or Seller profile based on user role
        if (user.role === 'buyer') {
          profile = await Buyer.findOne({ user: user._id }).exec();
  
        } if (user.role === 'seller') {
          profile = await Seller.findOne({ user: user._id }).exec();
        }
  
        profileData.profile = profile ? profile : ''; // Add seller profile to response
        
        return profileData;

      }));

      // Filter out any null participants
      const validParticipants = participants.filter((participant) => participant !== null);

      return {
        chatId: chat._id,
        participants: validParticipants,
      };
    }));

    // Filter out any null chats
    const validChats = profilesWithDetails.filter((chat) => chat !== null);
   

    res.status(200).json(validChats);
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// GET A SINGLE GROUP CHAT BY ID
router.get('/group/:groupId', authMiddleware, async (req, res) => {
  const { groupId } = req.params; // Extract groupId from the request parameters
  const userId = req.userId; // Get the authenticated user's ID

  try {
    // Find the group chat by groupId and ensure the user is a participant
    const groupChat = await GroupChat.findOne({ _id: groupId, participants: userId });

    if (!groupChat) {
      return res.status(404).json({ error: 'Group chat not found or you are not a participant' });
    }

    const profilesWithDetails = await Promise.all(groupChat.participants.map(async (participant) => {
      const user = await User.findById(participant).exec();

      if (!user) {
        console.error('Invalid user for participant ID:', participant);
        return null; // Skip invalid users
      }

      const profileData = {
        userId: participant,
        userDetails: user, // Include user details
      };

      let profile;

      // Fetch Buyer or Seller profile based on user role
      if (user.role === 'buyer') {
        profile = await Buyer.findOne({ user: user._id }).exec();
      } else if (user.role === 'seller') {
        profile = await Seller.findOne({ user: user._id }).exec();
      }

      profileData.profile = profile ? profile : ''; // Add profile to response

      return profileData;
    }));

    // Filter out any null participants
    const validParticipants = profilesWithDetails.filter((participant) => participant !== null);

    res.status(200).json({
      chatId: groupChat._id,
      participants: validParticipants,
      messages: groupChat.messages // Include messages if needed
    });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Send a message in a group chat
router.post('/:groupId/message', authMiddleware, upload.single('file'),async (req, res) => {
  const { groupId } = req.params;
  const senderId = req.userId;
  const message = req.body.message;
  const file = req.file;

  // kan ik hier de naam aanpassen?

  

  try {
    const groupChat = await GroupChat.findById(groupId);
    if (!groupChat) return res.status(404).json({ error: 'Group chat not found' });

    if (!file)
    {
      groupChat.messages.push({ sender: senderId, message });
    }

    else

    {
      groupChat.messages.push({ sender: senderId, message: message, filename: file.originalname, path: file.path });
    }

    await groupChat.save();

    res.status(201).json({ message: 'Message sent successfully!', groupChat });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;