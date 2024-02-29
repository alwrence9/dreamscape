const DB = require("./db.js");
const { config } = require('dotenv');
const path = require('path');

const currentFile = __filename || typeof require !== 'undefined' && require('url').fileURLToPath || '';
const currentDirectory = __dirname || path.dirname(currentFile);
const envPath = path.resolve(currentDirectory, '../.env');
config({ path: envPath });

const dbUrl = process.env.ATLAS_URI;
const db = new DB();

async function init_db(){
  await db.clearProfiles();
  await db.clearJournals();

  await db.insertProfile(
    {
      "email": "chadrew.brozay@gmail.com",
      "password": "bestest",
      "firstName": "Chadrew",
      "lastName": "Brozay"
    }
  );

  await db.insertDreamJournal(
    {
      "email": "chadrew.brozay@gmail.com",
      "date": { "string": "2-26-2024", "sinceEpoch": 1708923600000 },
      "title": "Class was cancelled",
      "description": "Class was cancelled, but I showed up anyways. 😎"
    }
  );

  await db.insertDreamJournal(
    {
      "email": "chadrew.brozay@gmail.com",
      "date": { "string": "2-27-2024", "sinceEpoch": 1709010000000 },
      "title": "Haunting Students",
      "description": "My students keep sending me soup pictures and the Key to the Misty Mountain"
    }
  );

  console.log("Insert data complete.");
}

db.connect(dbUrl).then( ()=> init_db() );
setTimeout(db.close, 5000);