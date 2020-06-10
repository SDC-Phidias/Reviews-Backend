const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Reviews", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  poolSize: 10
});

module.exports = mongoose.connection;
