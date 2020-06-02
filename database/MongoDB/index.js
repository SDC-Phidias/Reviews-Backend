const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Reviews", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Export
module.exports = mongoose.connection;
