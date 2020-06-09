const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

const parser = require("body-parser");
app.use(parser.json());

const routes = require("./routes");
app.use("/reviews", routes);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`LISTENING to port ${port}`);
});
