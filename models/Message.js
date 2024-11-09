const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const SkippedProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skippedProfileId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skippedAt: { type: Date, default: Date.now },
});

const SavedProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  savedProfileId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  savedAt: { type: Date, default: Date.now },
});

const Connection = mongoose.model('Connection', ConnectionSchema);
const SkippedProfile = mongoose.model('SkippedProfile', SkippedProfileSchema);
const SavedProfile = mongoose.model('SavedProfile', SavedProfileSchema);

module.exports = {
  Connection,
  SkippedProfile,
  SavedProfile
};
