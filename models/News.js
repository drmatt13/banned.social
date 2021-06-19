const mongoose = require('mongoose');

// create mongoose schema object
const Schema = new mongoose.Schema({
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
module.exports = mongoose.models.News || mongoose.model('News', Schema);