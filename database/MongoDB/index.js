const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Reviews", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = mongoose.connection;
