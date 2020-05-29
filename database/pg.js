const { Client } = require('pg');
const {username, password } = require('./config');

const client = new Client({
  user: username,
  password: password,
  host: 'localhost',
  port: 5432,
  database: 'Reviews'
});

client.connect()
.then(() => console.log('Connected'))
.catch((err) => console.error(err))
.finally(() => client.end());


