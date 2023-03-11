const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// Define a virtual property called `friendCount` that retrieves the length of the `friends` array field on query
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
