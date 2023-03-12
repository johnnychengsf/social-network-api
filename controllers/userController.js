const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Application.deleteMany({ _id: { $in: user.applications } })
      )
      .then(() => res.json({ message: 'User and associated apps deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    // app.post('/api/users/:userId/friends', (req, res) => {
    const { userId, friendId } = req.params;
    // fetch the user from the database using the userId
    User.findById(userId, (err, user) => {
      if (err) {
        return res.status(500).send({ error: 'Failed to find user' });
      }

      // add the friendId to the user's friend list
      user.friends.push(friendId);

      // save the updated user to the database
      user.save((err) => {
        if (err) {
          return res.status(500).send({ error: 'Failed to save user' });
        }

        // return the updated user object
        res.send(user);
      });
    });
  },
  deleteFriend (req, res) {
    // app.delete('/api/users/:userId/friends/:friendId', (req, res) => {
    const { userId, friendId } = req.params;
  
    // fetch the user from the database using the userId
    User.findById(userId, (err, user) => {
      if (err) {
        return res.status(500).send({ error: 'Failed to find user' });
      }
  
      // find the index of the friendId in the user's friend list
      const index = user.friends.indexOf(friendId);
  
      // if the friendId is not in the user's friend list, return an error
      if (index === -1) {
        return res.status(400).send({ error: 'Friend not found in user\'s friend list' });
      }
  
      // remove the friendId from the user's friend list
      user.friends.splice(index, 1);
  
      // save the updated user to the database
      user.save((err) => {
        if (err) {
          return res.status(500).send({ error: 'Failed to save user' });
        }
  
        // return the updated user object
        res.send(user);
      });
    });
  },
  
};
