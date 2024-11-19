require('dotenv').config();

const express = require('express');
const router = express.Router();
const Room = require('../models/Room'); // Import Room model
const User = require('../models/User'); // Import User model
const Buyer = require('../models/Buyer'); // Import Buyer model
const Seller = require('../models/Seller'); // Import Seller model

const authMiddleware = require('../middleware/auth'); // Import your middleware

router.delete('/:roomNumber', authMiddleware, async (req, res) => {

    try {
        const id = req.userId;

        const roomNumber = req.params.roomNumber

        const room = await Room.deleteOne({
            brokerId: id,
            roomNumber: roomNumber
          });        

        console.log('id', id);
    }

    catch (error) {
        console.error('Error deleting room:', error);
        res.status(500).json({ message: 'Server error while deleting room' });
    }

});

router.get('/:roomNumber', authMiddleware, async (req, res) => {
    try {
        const id = req.userId;

        const roomNumber = req.params.roomNumber

        const room = await Room.findOne({brokerId: id, roomNumber: roomNumber});

        if (!room)
        {
            return res.status(400).json({message: "Room not found"});
        }

        // also return names of participants in the participants array
        
        const participants = await Promise.all(room.participants.map(async (participant) => {
          
            
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

        room.participants = validParticipants;

        res.status(201).json(room);

        
    } catch (error) {
        console.error('Error retrieving room:', error);
        res.status(500).json({ message: 'Server error while retrieving room' });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const id = req.userId;

        const rooms = await Room.find({brokerId: id});

        // Incorrect code in routes/room.js
        res.status(201).json(rooms);

        
    } catch (error) {
        console.error('Error retrieving rooms:', error);
        res.status(500).json({ message: 'Server error while retrieving rooms' });
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        const id = req.userId;

        const formData = req.body;

        const room = await Room.findOne({brokerId: id, roomNumber: formData.roomNumber}).exec();

        if (!room)
        {

            newRoom = new Room ({
                brokerId: id,
                roomNumber: formData.roomNumber,
                created: Date.now(),
                phase: formData.phase,
                participants: formData.profilesToAdd,
                groupChatId: formData.groupChat,
                
            })
    
            await newRoom.save();
    
            // Incorrect code in routes/room.js
            return res.status(201).json({ message: "Room created successfully" });
        }

        res.status(400).json({message: 'Room with this number already exists.'});
        
    } catch (error) {
        console.error('Error retrieving profile:', error);
        res.status(500).json({ message: 'Server error while retrieving user' });
    }
});

module.exports = router;