const { Schema, model } = require('mongoose');
//const Reaction = require('./Reaction');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    
    //reactions: [reactionSchema],
    //reactions: [Reaction],
  }
);

// Define a virtual property called reactionCount that retrieves the length of the reactions array field on query
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Format timestamp on query
const dateFormat = (createdAtVal) => {
  return new Date(createdAtVal).toISOString();
};

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
