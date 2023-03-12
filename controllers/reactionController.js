const Reaction = require('../models/Reaction');

module.exports = {
   getReactions(req, res) {
      Reaction.find()
      .then((reaction) => res.json(reactions))
      .catch((err) => res.status(500).json(err));
  },
  getSingleReaction(req, res) {
   Reaction.findOne({ _id: req.params.reactionId })
      .select('-__v')
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction with that ID' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new reaction
  createReaction(req, res) {
   Reaction.create(req.body)
      .then((dbReactionData) => res.json(dbReactionData))
      .catch((err) => res.status(500).json(err));
  }
 }
 