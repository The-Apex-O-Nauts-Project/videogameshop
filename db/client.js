// Connect to DB
const { Client } = require('pg');

// change the DB_NAME string to whatever your group decides on
const DB_NAME = 'videogamedb';

const DB_URL =
 `postgres://localhost:5432/${DB_NAME}`;

let client;

// github actions client config

  // local / heroku client config
client = new Client(DB_URL);


module.exports = client;
