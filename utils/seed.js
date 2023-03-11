const connection = require('../config/connection');
const { Reaction, Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await Rection.deleteMany({});
  await Thought.deleteMany({});
  await User.deleteMany({});
/*
  const rections = [];
  const thoughts = [];
  const users = [];



  await Rection.collection.insertMany(rections);
  await Thought.collection.insertMany(thoughts);
  await User.collection.insertMany(users);
*/
  console.table(rections);
  console.table(thoughts);
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
