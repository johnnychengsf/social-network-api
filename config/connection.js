//const { connect, connection } = require('mongoose');
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost/socialNetworkAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
