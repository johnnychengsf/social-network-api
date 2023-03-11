const { Schema, model } = require('mongoose');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      default: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reactions',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
