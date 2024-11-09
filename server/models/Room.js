// models/Room.js
const mongoose = require('mongoose');

// Define the Room schema
const roomSchema = new mongoose.Schema({
  brokerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to Broker,
  roomNumber: {
    type: Number,
    required: true,
    unique: true, // Ensure each room number is unique
  },
  created: {
    type: Date,
    default: Date.now, // Set default to current date
  },
  updated: {
    type: Date,
    default: Date.now, // Set default to current date
  },
  phase: {type: String, required: false},
  participants: {type: Array, required: false},
  groupChatId: { type: mongoose.Schema.Types.ObjectId, ref: 'GroupChat', required: false }, // Reference to Broker,
  reports: {type: Array, required: false},
  
});

// Create a Room model
const Room = mongoose.model('Room', roomSchema);

// Function to generate the next room number
roomSchema.statics.getNextRoomNumber = async function () {
  const lastRoom = await this.findOne().sort({ roomNumber: -1 });
  return lastRoom ? lastRoom.roomNumber + 1 : 1; // Increment room number
};

// Export the Room model
module.exports = Room;



