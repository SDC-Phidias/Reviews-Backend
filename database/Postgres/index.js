const { Client } = require('pg');
const {username, password } = require('./config');

const client = new Client({
  user: username,
  password: password,
  host: 'localhost',
  port: 5432,
  database: 'Reviews'
});

 execute();
 
 async function execute() {
   try {
     await client.connect()
     console.log('Connected')
    }
    catch (error) {
      console.error(error);
    }
    finally {
      await client.end();
      console.log('Connection disconnected successfully');      
   }
 }