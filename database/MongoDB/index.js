const mongoose = require("mongoose");
mongoose.connect("mongodb://mongo:27017/Reviews", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  poolSize: 5
})
.then(() => console.log('Connected to Mongodb'))
.catch((err) => console.log('ERROR', err));

module.exports = mongoose.connection;
