const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Pre-save hook to hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if the password has been modified (or is new)
  this.password = await bcrypt.hash(this.password, 8); // Using bcrypt with 8 rounds of salt
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
