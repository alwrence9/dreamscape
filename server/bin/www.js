const {app} = require('../api');
const { config } = require('dotenv');
const path = require('path');

const port = process.env.PORT || 3000;

const currentFile = __filename || typeof require !== 'undefined' && require('url').fileURLToPath || '';
const currentDirectory = __dirname || path.dirname(currentFile);
const envPath = path.resolve(currentDirectory, '../.env');
config({ path: envPath });

const dbUrl = process.env.ATLAS_URI;

const server = app.listen(port, () => {
  if(!dbUrl) {
    throw new Error("Connection URL was not found. Check if it is set in .env.");
  }

  console.log(`App listening on port ${port}.`);
})

process.on('SIGINT', () => {
  server.close( () => {console.log("Closing server.")} );
});
