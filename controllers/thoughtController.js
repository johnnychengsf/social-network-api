const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  getThoughts(req, res) {
   Thought.find()
     .then((thoughts) => res.json(thoughts))
     .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    console.log("findOne thoughtId: " + req.params.thoughtId);
    Thought.findOne({ _id: req.params.thoughtId })
     .select('-__v')
     .then((thought) =>
       !thought
         ? res.status(404).json({ message: 'No thought with that ID' })
         : res.json(thought)
     )
     .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        console.log("thoughtId: " + dbThoughtData._id);
        console.log("userId: " + req.body.userId);

        User.findById(req.body.userId, (err, user) => {
          if (err) {
            return res.status(500).send({ error: 'Failed to find user' });
          }
          // add the Thought to the user's Thought list
          user.thoughts.push(dbThoughtData._id);
          // save the updated user to the database
          console.log(user.thoughts);
          
          user.save((err) => {
            if (err) {
              return res.status(500).send({ error: 'Failed to save user' });
            }
          });
        });
        res.json(dbThoughtData);
      }
    )
    .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    )
      .then(updatedThought => {
        console.log(updatedThought);
        res.json(updatedThought);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteReaction(req, res) {
    const { thoughtId, reactionId } = req.params;
    
    Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: { _id: reactionId } }},
      { new: true }
    )
      .then(updatedThought => {
        console.log(updatedThought);
        res.json(updatedThought);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
}
