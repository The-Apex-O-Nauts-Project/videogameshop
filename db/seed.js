const client = require('./client');
const { rebuildDB} = require('./init_db');
//console.log(client)


rebuildDB()
  .catch(console.error)
  .finally(() => client.end());