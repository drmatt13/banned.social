const mongoose = require('mongoose');

// create mongoose schema object
const Schema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, 'Please add a user_id'],
    trim: true,
    length: [24, 'please make sure length of userId is 24']
  },
  profile_id: {
    type: String,
    required: [true, 'Please add a profile_id'],
    trim: true,
    length: [24, 'please make sure length of userId is 24']
  },
  post: {
    type: String,
    trim: true
  },
  href: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// The collection name for this DB is defined in the export
module.exports = mongoose.models.Post || mongoose.model('Post', Schema);