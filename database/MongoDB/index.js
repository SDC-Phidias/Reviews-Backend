const mongoose = require("mongoose");
mongoose.connect("mongodb://mongo:27017/Reviews", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  poolSize: 5
});

module.exports = mongoose.connection;
