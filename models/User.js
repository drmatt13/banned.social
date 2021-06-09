const mongoose = require('mongoose');

// create mongoose schema object
const Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a first name'],
    trim: true,
    maxlength: [25, 'First name can not be more then 20 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name'],
    trim: true,
    maxlength: [25, 'Last name can not be more then 20 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    trim: true,
    maxlength: [50, 'Email can not be more then 20 characters']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    unique: true,
    trim: true,
    maxlength: [255, 'Password can not be more then 255 characters'],
    select: false
  },
  profileImage: {
    type: Boolean,
    default: false
  },
  admin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

Schema.pre('save', function (next) {
  this.firstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1).toLowerCase()
  this.lastName = this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1).toLowerCase()
  next();
});

// The collection name for this DB is defined in the export
module.exports = mongoose.models.User || mongoose.model('User', Schema);