// models/GroupChat.js
const mongoose = require('mongoose');

const GroupChatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
});

const GroupChat = mongoose.model('GroupChat', GroupChatSchema);

module.exports = GroupChat;
