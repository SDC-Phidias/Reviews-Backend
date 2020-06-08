const mongoose = require("mongoose");

mongoose.connect(`mongodb://mongo/Reviews`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  poolSize: 10
})
.then(() => console.log('Connected to Mongodb'))
.catch((err) => console.log('ERROR', err));

module.exports = mongoose.connection;
