const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  getThoughts(req, res) {
   Thought.find()
     .then((thoughts) => res.json(thoughts))
     .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
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
     .then((dbThoughtData) => res.json(dbThoughtData))
     .catch((err) => res.status(500).json(err));
    Thought.create(req.body)
      .then((Thought) => {
        console.log("thoughtId: " + Thought._id);
        console.log("userId: " + req.body.userId);

        User.findById(req.body.userId, (err, user) => {
          if (err) {
            return res.status(500).send({ error: 'Failed to find user' });
          }
          // add the Thought to the user's Thought list
          user.thoughts.push(Thought._id);
          // save the updated user to the database
          console.log(user.thoughts);
          
          user.save((err) => {
            if (err) {
              return res.status(500).send({ error: 'Failed to save user' });
            }
          });
        });
      }
    )
    .catch((err) => res.status(500).json(err));
/*

    Application.findOneAndRemove({ _id: req.params.applicationId })
      .then((application) =>
        !application
          ? res.status(404).json({ message: 'No application with this id!' })
          : User.findOneAndUpdate(
              { applications: req.params.applicationId },
              { $pull: { applications: req.params.applicationId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Application created but no user with this id!',
            })
          : res.json({ message: 'Application successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
*/

  }
}
