const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Reviews", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
