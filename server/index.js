const express = require('express');
const app = express();
const port = process.env.port || 8080;

app.get('/', (req, res) => { 
    res.status(418).send('Connected');
});

app.listen(port, () => {
  console.log(`LISTENING to port ${port}`);
});