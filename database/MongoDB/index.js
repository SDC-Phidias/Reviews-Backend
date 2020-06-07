const mongoose = require("mongoose");
const {MONGO_DATABASE,
  MONGO_HOST,
  MONGO_PASSWORD,
  MONGO_USERNAME,
  MONGO_PORT,
  MONGO_OPTIONS} = require('./config');

mongoose.connect(`mongodb://${MONGO_HOST}/${MONGO_DATABASE}`, MONGO_OPTIONS)
.then(() => console.log('Connected to Mongodb'))
.catch((err) => console.log('ERROR', err));

module.exports = mongoose.connection;
